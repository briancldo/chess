import { getSquareAtOffset } from '../board';
import { BoardSquare } from '../board.types';

const offsets = [1, -1, 2, -2];
const knightMove = (square: BoardSquare) => {
  const squares: BoardSquare[] = [];

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
};

export default knightMove;
