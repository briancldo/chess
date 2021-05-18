import {
  getSquareAtOffset,
  getCastlingRank,
  getCastlingPosition,
  getPieceAtSquare,
} from '../board';
import { BoardPosition, BoardSquare, BoardState } from '../board.types';
import { PieceColor } from '../pieces.types';
import { CastleSide, PieceMoveHandler } from './moves.types';
import {
  excludeOccupiedSquares,
  castlingPathSquares,
  isSquareAttacked,
} from './utils';

const kingMove: PieceMoveHandler = (square, color, position, boardState) => {
  const regularMoves = computeRegularMoves(square);
  const castlingMoves = computeCastlingMoves(
    color as PieceColor,
    position as BoardPosition,
    boardState as BoardState
  );

  return [...regularMoves, ...castlingMoves];
};

export default kingMove;

const offsets = [0, 1, -1] as const;
export function computeRegularMoves(square: BoardSquare) {
  const squares: BoardSquare[] = [];

  for (const offsetX of offsets) {
    for (const offsetY of offsets) {
      if (offsetX == 0 && offsetY === 0) continue;

      try {
        squares.push(getSquareAtOffset(square, offsetX, offsetY));
      } catch {
        0;
      }
    }
  }

  return squares;
}

function computeCastlingMoves(
  color: PieceColor,
  position: BoardPosition,
  boardState: BoardState
) {
  const canQueensideCastle = computeCanCastleSide(
    'q',
    color,
    position,
    boardState
  );
  const canKingsideCastle = computeCanCastleSide(
    'k',
    color,
    position,
    boardState
  );
  const castlingRank = getCastlingRank(color);

  const squares: BoardSquare[] = [];
  if (canQueensideCastle) squares.push({ rank: castlingRank, file: 'c' });
  if (canKingsideCastle) squares.push({ rank: castlingRank, file: 'g' });
  return squares;
}

function computeCanCastleSide(
  side: CastleSide,
  color: PieceColor,
  position: BoardPosition,
  boardState: BoardState
) {
  if (isRookGone(side, color, position)) return false;
  if (haveCastlingPiecesMoved(side, color, boardState)) return false;
  if (areCastlingSquaresOccupied(side, color, position)) return false;
  if (areCastlingSquaresAttacked(side, color, position)) return false;

  return true;
}

function areCastlingSquaresOccupied(
  side: CastleSide,
  color: PieceColor,
  position: BoardPosition
) {
  const castlingSquares = castlingPathSquares[color][side];
  const unoccupiedCastlingSquares = excludeOccupiedSquares(
    castlingSquares,
    position,
    color,
    { ignoreColor: true }
  );

  if (unoccupiedCastlingSquares.length !== castlingSquares.length) return true;
  return false;
}

function areCastlingSquaresAttacked(
  side: CastleSide,
  color: PieceColor,
  position: BoardPosition
) {
  const castlingSquares = castlingPathSquares[color][side];

  for (const square of castlingSquares) {
    if (isSquareAttacked(square, position, color)) return true;
  }

  return false;
}

function haveCastlingPiecesMoved(
  side: CastleSide,
  color: PieceColor,
  boardState: BoardState
) {
  const kingCanCastle = boardState.castling[color].k;
  if (!kingCanCastle) return true;

  const queenRookCanCastle = boardState.castling[color].side.q;
  if (side === 'q' && !queenRookCanCastle) return true;
  const kingRookCanCastle = boardState.castling[color].side.k;
  if (side === 'k' && !kingRookCanCastle) return true;

  return false;
}

function isRookGone(
  side: CastleSide,
  color: PieceColor,
  position: BoardPosition
) {
  const rookSquare = getCastlingPosition(color)[side].rFormer;
  const piece = getPieceAtSquare(position, rookSquare);

  if (!piece || piece.type !== 'r' || piece.color !== color) return true;
  return false;
}
