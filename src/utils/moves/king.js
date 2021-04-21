import { getSquareAtOffset } from '../board';

export default function kingMove(square) {
  const regularMoves = computeRegularMoves(square);

  return [...regularMoves];
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
