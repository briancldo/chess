import { getPieceAtSquare, getSquareAtOffset } from '../board';

export default function kingMove(square, board, color) {
  const inBoundsSquares = computeInBoundsSquares(square);
  return excludeOccupiedSquares(inBoundsSquares, board, color);
}

function computeInBoundsSquares(square) {
  const squares = [];

  for (const offsetX of [0, 1, -1]) {
    for (const offsetY of [0, 1, -1]) {
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

function excludeOccupiedSquares(squares, board, color) {
  return squares.filter((square) => {
    const piece = getPieceAtSquare(board, square);
    if (!piece) return true;
    if (piece.color !== color) return true;

    return false;
  });
}
