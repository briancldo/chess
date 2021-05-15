import { getLegalSquaresInDirection } from './utils';

const offsetDirections = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export default function rookMove(square, color, position) {
  const squares = [];

  for (const offsetDirection of offsetDirections) {
    squares.push(
      ...getLegalSquaresInDirection(square, position, color, offsetDirection)
    );
  }

  return squares;
}
