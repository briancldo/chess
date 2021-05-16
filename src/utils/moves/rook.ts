import { BoardPosition, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';
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
      ...getLegalSquaresInDirection(square, position as BoardPosition, color as PieceColor, offsetDirection)
    );
  }

  return squares;
}

export default rookMove;
