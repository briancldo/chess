import { BoardPosition, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';
import { getLegalSquaresInDirection } from './utils';

const offsetDirections: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const rookMove = (
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition
) => {
  const squares: BoardSquare[] = [];

  for (const offsetDirection of offsetDirections) {
    squares.push(
      ...getLegalSquaresInDirection(square, position, color, offsetDirection)
    );
  }

  return squares;
};

export default rookMove;
