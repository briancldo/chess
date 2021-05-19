import { getSquareAtOffset } from '../board';
import { Board, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';
import { excludeOccupiedSquares } from './utils';

const offsets = [1, -1, 2, -2];
const knightMove = (square: BoardSquare, color: PieceColor, board: Board) => {
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

  return excludeOccupiedSquares(squares, board.position, color);
};

export default knightMove;
