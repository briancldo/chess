import { getSquareAtOffset } from '../board';

const offsets = [1, -1, 2, -2];
export default function knightMove(square) {
  const squares = [];

  for (const offsetX of offsets) {
    for (const offsetY of offsets) {
      try {
        if (Math.abs(offsetX) === Math.abs(offsetY)) continue;
        squares.push(getSquareAtOffset(square, offsetX, offsetY));
      } catch {
        0;
      }
    }
  }

  return squares;
}
