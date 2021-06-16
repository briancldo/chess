import { original, produce, Draft } from 'immer';
import {
  getCastlingPosition,
  getPieceAtSquare,
  getKingSquare,
  files,
  getCheckedSide,
} from '../board/board';
import {
  Board,
  BoardFile,
  BoardPosition,
  BoardRank,
  BoardSquare,
  BoardState,
  GameResult,
} from '../board/board.types';
import { matchingSquares } from '../board/square/square';
import { flipColor } from '../pieces';
import { setCheckDetails } from './checks';
import { isSquareAttacked } from './utils';
import { getPieceLegalMoves } from './moves';
import { DevError } from '../errors';
import config from '../../config/config';
import { Piece, PieceColor } from '../pieces.types';

const backRank = {
  w: config.get('board.dimensions.numberRanks'),
  b: 1,
};

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
    draft.position[start.rank][start.file] = undefined;
    const { isPromotionTurn } = handleSpecialCases(board, draft, piece, {
      start,
      end,
    });
    if (isPromotionTurn) return;

    handleCapturedPiece(draft, end);
    draft.position[end.rank][end.file] = piece;
    handleChecks(board.state, draft, piece.color);
    draft.state.turn = flipColor(draft.state.turn);

    handleDetermineGameOver(draft, piece.color);
  });
}

type StartEndSquares = { start: BoardSquare; end: BoardSquare };
type SpecialCasesReturn = { isPromotionTurn: IsPromotionTurn };
function handleSpecialCases(
  board: Board,
  draft: Draft<Board>,
  piece: Piece,
  squares: StartEndSquares
): SpecialCasesReturn {
  const { state: boardState, position } = board;
  const isPromotion = handlePawnPromotion(
    draft,
    piece,
    squares.start,
    squares.end
  );
  if (isPromotion) return { isPromotionTurn: true };

  handleEnPassant(position, draft, piece, squares);
  handleCastling(boardState, draft, piece, squares.end);
  handleCastlingPiecesMoved(boardState, draft, piece, squares.start);
  handleKingMoved(draft, piece, squares.end);
  return { isPromotionTurn: false };
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

type IsPromotionTurn = boolean;
function handlePawnPromotion(
  draft: Draft<Board>,
  piece: Piece,
  start: BoardSquare,
  end: BoardSquare
): IsPromotionTurn {
  if (draft.state.promotion.active) {
    draft.state.promotion = { active: false };
    return false;
  }

  if (piece.type !== 'p') return false;

  if (end.rank === backRank[piece.color]) {
    draft.state.promotion = {
      active: true,
      prePromoSquare: start,
      square: end,
    };
    return true;
  }
  return false;
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

function handleCapturedPiece(draft: Draft<Board>, end: BoardSquare) {
  console.log({
    capturedPiece: (original(draft) as Board).position[end.rank][end.file],
  });
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
