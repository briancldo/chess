import { produce, Draft } from 'immer';
import {
  getCastlingPosition,
  getPieceAtSquare,
  matchingSquares,
  getKingSquare,
  files,
  getCheckedSide,
} from '../board/board';
import { flipColor } from '../pieces';
import { setCheckDetails } from './checks';
import { isSquareAttacked } from './utils';
import { getPieceLegalMoves } from './moves';
import { DevError } from '../errors';
import config from '../../config/config';
import {
  Board,
  BoardFile,
  BoardPosition,
  BoardRank,
  BoardSquare,
  BoardState,
  GameResult,
} from '../board/board.types';
import { Piece, PieceColor, PieceType } from '../pieces.types';

const backRank = {
  w: config.get('board.dimensions.numberRanks'),
  b: 1,
};
const promotionPieces = ['q', 'r', 'b', 'n'];
export default function makeMove(
  board: Board,
  start: BoardSquare,
  end: BoardSquare
) {
  const piece = getPieceAtSquare(board.position, start);

  return produce(board, (draft) => {
    if (!piece)
      throw new DevError(`No piece at start square ${JSON.stringify(start)}`);

    // this order is neccessary
    draft.position[end.rank][end.file] = piece;
    handleSpecialCases(board, draft, piece, { start, end });
    draft.position[start.rank][start.file] = undefined;
    handleChecks(board.state, draft, piece.color);
    draft.state.turn = flipColor(draft.state.turn);

    handleDetermineGameOver(draft, piece.color);
  });
}

type StartEndSquares = { start: BoardSquare; end: BoardSquare };
function handleSpecialCases(
  board: Board,
  draft: Draft<Board>,
  piece: Piece,
  squares: StartEndSquares
) {
  const { state: boardState, position } = board;
  handleEnPassant(position, draft, piece, squares);
  handlePawnPromotion(draft, piece, squares.end);
  handleCastling(boardState, draft, piece, squares.end);
  handleCastlingPiecesMoved(boardState, draft, piece, squares.start);
  handleKingMoved(draft, piece, squares.end);
}

function handleEnPassant(
  position: BoardPosition,
  draft: Draft<Board>,
  piece: Piece,
  squares: StartEndSquares
) {
  const { start, end } = squares;

  let isEnPassantSquare: boolean | undefined;
  let capturedEnPassant: boolean | undefined;
  if (piece.type === 'p') {
    isEnPassantSquare = Math.abs(end.rank - start.rank) === 2;
    capturedEnPassant =
      start.file !== end.file && getPieceAtSquare(position, end) === undefined;
  }

  if (capturedEnPassant) {
    const { rank, file } = draft.state.enPassantSquare as BoardSquare;
    draft.position[rank][file] = undefined;
  }
  draft.state.enPassantSquare = isEnPassantSquare ? end : undefined;
}

function handlePawnPromotion(
  draft: Draft<Board>,
  piece: Piece,
  end: BoardSquare
) {
  if (piece.type !== 'p') return;

  if (end.rank === backRank[piece.color])
    draft.position[end.rank][end.file] = promotePawn(piece.color);
}

function isValidPromotionPieceType(
  pieceTypeString: string | null
): pieceTypeString is PieceType {
  if (pieceTypeString === null) return false;
  return promotionPieces.includes(pieceTypeString);
}

function promotePawn(color: PieceColor) {
  let promotionPieceType;
  do {
    promotionPieceType = prompt(`Promote to: (${promotionPieces.join(', ')})`);
  } while (!isValidPromotionPieceType(promotionPieceType));

  return { type: promotionPieceType, color };
}

function handleCastling(
  boardState: BoardState,
  draft: Draft<Board>,
  piece: Piece,
  end: BoardSquare
) {
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

function handleCastlingPiecesMoved(
  boardState: BoardState,
  draft: Draft<Board>,
  piece: Piece,
  start: BoardSquare
) {
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

function handleKingMoved(
  draft: Draft<Board>,
  piece: Piece,
  endSquare: BoardSquare
) {
  if (piece.type !== 'k') return;
  draft.state.king[piece.color].square = endSquare;
}

function handleChecks(
  boardState: BoardState,
  draft: Draft<Board>,
  enemyColor: PieceColor
) {
  const kingColor = flipColor(enemyColor);
  const kingSquare = getKingSquare(boardState, kingColor);
  if (!kingSquare) return;

  const isKingChecked = isSquareAttacked(kingSquare, kingColor, draft);
  if (!isKingChecked) return handleUncheck(draft);
  draft.state.check.side = kingColor;
  setCheckDetails(draft, kingSquare, kingColor);
}

function handleUncheck(draft: Draft<Board>) {
  draft.state.check.side = undefined;
  draft.state.check.details.threatPieces = [];
  draft.state.check.details.threatSquares = [];
}

function handleDetermineGameOver(draft: Draft<Board>, color: PieceColor) {
  const enemyColor = flipColor(color);
  const enemyKingSquare = getKingSquare(draft.state, enemyColor);
  if (!enemyKingSquare) return;
  const kingMoves = getPieceLegalMoves(draft, enemyKingSquare, {
    type: 'k',
    color: enemyColor,
  });
  if (kingMoves.length > 0) return;

  const allyPiecesCanMove = canAllyPiecesMove(draft, enemyColor);
  if (allyPiecesCanMove) return;

  const isKingChecked = getCheckedSide(draft.state) === enemyColor;
  draft.state.result = {
    value: isKingChecked ? '+' : '=',
    side: isKingChecked ? color : undefined,
    method: isKingChecked ? 'c' : 's',
  } as GameResult;
}

function canAllyPiecesMove(draft: Draft<Board>, color: PieceColor) {
  const position = draft.position;
  const numRanks = position.length;

  for (let rank = 1; rank < numRanks; rank++) {
    const rankRow = position[rank];
    for (const file in rankRow) {
      const piece = position[rank as BoardRank][file as BoardFile];
      if (!piece || piece.color !== color) continue;

      const moves = getPieceLegalMoves(
        draft,
        { rank: rank as BoardRank, file: file as BoardFile },
        piece
      );
      if (moves.length > 0) return true;
    }
  }
  return false;
}
