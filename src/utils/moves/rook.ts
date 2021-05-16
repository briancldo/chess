import { BoardSquare } from '../board.types';
import { PieceMoveHandler } from './moves.types';
import { getLegalSquaresInDirection } from './utils';

const offsetDirections: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const rookMove: PieceMoveHandler = (square, color, position) => {
  const squares: BoardSquare[] = [];

  for (const offsetDirection of offsetDirections) {
    squares.push(
      ...getLegalSquaresInDirection(square, position, color, offsetDirection)
    );
  }

  return squares;
}

export default rookMove;
