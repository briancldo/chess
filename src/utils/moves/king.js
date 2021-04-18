import { getSquareAtOffset } from '../board';

export default function kingMove(square) {
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
