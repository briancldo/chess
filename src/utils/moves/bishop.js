import { getLegalSquaresInDirection } from './utils';

const offsetDirections = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export default function bishopMove(square, color, position) {
  const squares = [];

  for (const offsetDirection of offsetDirections) {
    squares.push(
      ...getLegalSquaresInDirection(square, position, color, offsetDirection)
    );
  }

  return squares;
}
