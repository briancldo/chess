import { produce } from 'immer';
import {
  getCastlingPosition,
  getPieceAtSquare,
  matchingSquares,
  validateSquare,
  getKingSquare,
  files,
} from '../board';
import { flipColor } from '../pieces';
import { setCheckDetails } from './checks';
import { isSquareAttacked } from './utils';
import { DevError } from '../errors';
import config from '../../config/config';

const backRank = {
  w: config.get('board.dimensions.numberRanks'),
  b: 1,
};
const promotionPieces = ['q', 'r', 'b', 'n'];
export default function makeMove(board, start, end) {
  validateSquare(start);
  validateSquare(end);

  let piece = getPieceAtSquare(board.position, start);
  if (!piece)
    throw new DevError(`No piece at start square ${JSON.stringify(start)}`);

  return produce(board, (draft) => {
    // this order is neccessary
    draft.position[end.rank][end.file] = piece;
    handleSpecialCases(board, draft, piece, { start, end });
    draft.position[start.rank][start.file] = undefined;
    handleChecks(board.state, draft, piece.color);
  });
}

function handleSpecialCases(board, draft, piece, squares) {
  const { state: boardState, position } = board;
  handleEnPassant(position, draft, piece, squares);
  handlePawnPromotion(draft, piece, squares.end);
  handleCastling(boardState, draft, piece, squares.end);
  handleCastlingPiecesMoved(boardState, draft, piece, squares.start);
  handleKingMoved(draft, piece, squares.end);
}

function handleEnPassant(position, draft, piece, squares) {
  const { start, end } = squares;

  let isEnPassantSquare;
  let capturedEnPassant;
  if (piece.type === 'p') {
    isEnPassantSquare = Math.abs(end.rank - start.rank) === 2;
    capturedEnPassant =
      start.file !== end.file && getPieceAtSquare(position, end) === undefined;
  }

  if (capturedEnPassant) {
    const { rank, file } = draft.state.enPassantSquare;
    draft.position[rank][file] = undefined;
  }
  draft.state.enPassantSquare = isEnPassantSquare ? end : undefined;
}

function handlePawnPromotion(draft, piece, end) {
  if (piece.type !== 'p') return;

  if (end.rank === backRank[piece.color])
    draft.position[end.rank][end.file] = promotePawn(piece.color);
}

function promotePawn(color) {
  let promotionPiece;
  do {
    promotionPiece = prompt(`Promote to: (${promotionPieces.join(', ')})`);
  } while (!promotionPieces.includes(promotionPiece));

  return { type: promotionPiece, color };
}

function handleCastling(boardState, draft, piece, end) {
  if (piece.type !== 'k') return;
  const castling = boardState.castling[piece.color];
  if (!castling.k) return;

  const castlingSquares = getCastlingPosition(piece.color);
  const isQueensideSquare = matchingSquares(end, castlingSquares.q.k);
  const isKingsideSquare = matchingSquares(end, castlingSquares.k.k);
  if (!isQueensideSquare && !isKingsideSquare) return;
  if (!castling.side.q && !castling.side.k) return;

  const side = isKingsideSquare ? 'k' : 'q';
  const rookSquare = castlingSquares[side].r;
  const oldRookSquare = castlingSquares[side].rFormer;
  draft.position[rookSquare.rank][rookSquare.file] = {
    type: 'r',
    color: piece.color,
  };
  draft.position[oldRookSquare.rank][oldRookSquare.file] = undefined;

  draft.state.castling[piece.color].k = false;
  draft.state.castling[piece.color].side.q = false;
  draft.state.castling[piece.color].side.k = false;
}

function handleCastlingPiecesMoved(boardState, draft, piece, start) {
  if (piece.type === 'k') draft.state.castling[piece.color].k = false;

  if (piece.type !== 'r') return;
  const rookCastlingState = boardState.castling[piece.color].side;

  if (rookCastlingState.q && start.file === files.first) {
    draft.state.castling[piece.color].side.q = false;
  }
  if (rookCastlingState.k && start.file === files.last) {
    draft.state.castling[piece.color].side.k = false;
  }
}

function handleKingMoved(draft, piece, endSquare) {
  if (piece.type !== 'k') return;
  draft.state.king[piece.color].square = endSquare;
}

function handleChecks(boardState, draft, enemyColor) {
  const kingColor = flipColor(enemyColor);
  const kingSquare = getKingSquare(boardState, kingColor);

  const isKingChecked = isSquareAttacked(kingSquare, draft.position, kingColor);
  if (!isKingChecked) return handleUncheck(draft);
  draft.state.king.checkedSide = kingColor;
  setCheckDetails(draft, kingSquare, kingColor);
}

function handleUncheck(draft) {
  draft.state.king.checkedSide = undefined;
  draft.state.king.checkDetails.threatPieces = [];
  draft.state.king.checkDetails.threatSquares = [];
}
