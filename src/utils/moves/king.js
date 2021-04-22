import { getSquareAtOffset, files, ranks } from '../board';
import {
  excludeOccupiedSquares,
  castlingPathSquares,
  isSquareAttacked,
} from './utils';

export default function kingMove(square, board, color) {
  const regularMoves = computeRegularMoves(square);
  const castlingMoves = computeCastlingMoves(board, color);

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

function computeCastlingMoves(board, color) {
  if (haveCastlingPiecesMoved(board, color)) return [];
  const canQueensideCastle = computeCanCastleSide('q', board, color);
  const canKingsideCastle = computeCanCastleSide('k', board, color);

  const castlingRank = color === 'w' ? ranks.first : ranks.last;
  const squares = [];
  if (canQueensideCastle) squares.push({ rank: castlingRank, file: 'c' });
  if (canKingsideCastle) squares.push({ rank: castlingRank, file: 'g' });
  return squares;
}

function haveCastlingPiecesMoved(board, color) {
  const kingCanCastle = board[0].castling[color].k;
  if (!kingCanCastle) return true;

  const queenRookCanCastle = board[0].castling[color][files.first];
  if (!queenRookCanCastle) return true;
  const kingRookCanCastle = board[0].castling[color][files.last];
  if (!kingRookCanCastle) return true;

  return false;
}

function computeCanCastleSide(side, board, color) {
  if (areCastlingSquaresOccupied(side, board, color)) return false;
  if (areCastlingSquaresAttacked(side, board, color)) return false;

  return true;
}

function areCastlingSquaresOccupied(side, board, color) {
  const castlingSquares = castlingPathSquares[color][side];
  const unoccupiedCastlingSquares = excludeOccupiedSquares(
    castlingSquares,
    board,
    color,
    { ignoreColor: true }
  );
  if (unoccupiedCastlingSquares.length !== castlingSquares.length) return true;
  return false;
}

function areCastlingSquaresAttacked(side, board, color) {
  const castlingSquares = castlingPathSquares[color][side];

  for (const square of castlingSquares) {
    if (isSquareAttacked(square, board, color)) return true;
  }

  return false;
}
