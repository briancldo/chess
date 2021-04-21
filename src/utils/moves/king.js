import { getSquareAtOffset, files } from '../board';

export default function kingMove(square, board, color) {
  const regularMoves = computeRegularMoves(square);
  const castlingMoves = computeCastlingMoves(square, board, color);

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

function computeCastlingMoves(square, board, color) {
  if (haveCastlingPiecesMoved(square, board, color)) return [];

  return [];
}

function haveCastlingPiecesMoved(square, board, color) {
  const kingCanCastle = board[0].castling[color].k;
  if (!kingCanCastle) return true;

  const firstRookCanCastle = board[0].castling[color][files.first];
  if (!firstRookCanCastle) return true;
  const secondRookCanCastle = board[0].castling[color][files.last];
  if (!secondRookCanCastle) return true;

  return false;
}
