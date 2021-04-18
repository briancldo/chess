import { getLegalSquaresInDirection } from './utils';

const offsetDirections = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export default function bishopMove(square, board, color) {
  const squares = [];

  for (const offsetDirection of offsetDirections) {
    squares.push(
      ...getLegalSquaresInDirection(square, board, color, offsetDirection)
    );
  }

  return squares;
}
