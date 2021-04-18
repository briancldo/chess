import { getPieceAtSquare, getSquareAtOffset } from '../board';

const offsetDirections = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export default function rookMove(square, board, color) {
  const squares = [];

  for (const offsetDirection of offsetDirections) {
    squares.push(
      ...getLegalSquaresInDirection(square, board, color, offsetDirection)
    );
  }

  return squares;
}

function getLegalSquaresInDirection(square, board, color, offsetDirection) {
  const squares = [];
  let currentSquare = square;
  const [offsetX, offsetY] = offsetDirection;
  let done = false;

  while (!done) {
    try {
      currentSquare = getSquareAtOffset(currentSquare, offsetX, offsetY);
      const currentSquarePiece = getPieceAtSquare(board, currentSquare);

      if (!currentSquarePiece) {
        squares.push(currentSquare);
        continue;
      }

      if (currentSquarePiece.color !== color) squares.push(currentSquare);
      done = true;
    } catch {
      done = true;
    }
  }

  return squares;
}
