import {
  getSquareAtOffset,
  getCastlingRank,
  getCastlingPosition,
  getPieceAtSquare,
} from '../board';
import {
  excludeOccupiedSquares,
  castlingPathSquares,
  isSquareAttacked,
} from './utils';

export default function kingMove(square, color, position, boardState) {
  const regularMoves = computeRegularMoves(square);
  const castlingMoves = computeCastlingMoves(color, position, boardState);

  return [...regularMoves, ...castlingMoves];
}

const offsets = [0, 1, -1];
function computeRegularMoves(square) {
  const squares = [];

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

function computeCastlingMoves(color, position, boardState) {
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

  const squares = [];
  if (canQueensideCastle) squares.push({ rank: castlingRank, file: 'c' });
  if (canKingsideCastle) squares.push({ rank: castlingRank, file: 'g' });
  return squares;
}

function computeCanCastleSide(side, color, position, boardState) {
  if (isRookGone(side, color, position)) return false;
  if (haveCastlingPiecesMoved(side, color, boardState)) return false;
  if (areCastlingSquaresOccupied(side, color, position)) return false;
  if (areCastlingSquaresAttacked(side, color, position)) return false;

  return true;
}

function areCastlingSquaresOccupied(side, color, position) {
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

function areCastlingSquaresAttacked(side, color, position) {
  const castlingSquares = castlingPathSquares[color][side];

  for (const square of castlingSquares) {
    if (isSquareAttacked(square, position, color)) return true;
  }

  return false;
}

function haveCastlingPiecesMoved(side, color, boardState) {
  const kingCanCastle = boardState.castling[color].k;
  if (!kingCanCastle) return true;

  const queenRookCanCastle = boardState.castling[color].side.q;
  if (side === 'q' && !queenRookCanCastle) return true;
  const kingRookCanCastle = boardState.castling[color].side.k;
  if (side === 'k' && !kingRookCanCastle) return true;

  return false;
}

function isRookGone(side, color, position) {
  const rookSquare = getCastlingPosition(color)[side].rFormer;
  const piece = getPieceAtSquare(position, rookSquare);

  if (!piece || piece.type !== 'r' || piece.color !== color) return true;
  return false;
}
