import { getSquareAtOffset, getPieceAtSquare, ranks } from '../board';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';

export function getLegalSquaresInDirection(
  square,
  board,
  color,
  offsetDirection
) {
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

export function excludeOccupiedSquares(squares, board, color, options = {}) {
  return squares.filter((square) => {
    const piece = getPieceAtSquare(board, square);

    if (!piece) return true;
    if (options.ignoreColor) return false;
    if (piece.color !== color) return true;

    return false;
  });
}

export const castlingPathSquares = {
  w: {
    q: [
      { rank: ranks.first, file: 'b' },
      { rank: ranks.first, file: 'c' },
      { rank: ranks.first, file: 'd' },
    ],
    k: [
      { rank: ranks.first, file: 'f' },
      { rank: ranks.first, file: 'g' },
    ],
  },
  b: {
    q: [
      { rank: ranks.first, file: 'b' },
      { rank: ranks.first, file: 'c' },
      { rank: ranks.first, file: 'd' },
    ],
    k: [
      { rank: ranks.first, file: 'f' },
      { rank: ranks.first, file: 'g' },
    ],
  },
};

export function getDirection(color) {
  return color === 'w' ? 1 : -1;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function isSquareAttacked(square, board, color) {
  const rookMoves = rookMove(square, board, color);
  const rookMovePieces = rookMoves.map((move) => getPieceAtSquare(board, move));
  for (const piece of rookMovePieces) {
    if (!piece) continue;
    if (['r', 'q'].includes(piece.type) && piece.color !== color) return true;
  }

  const bishopMoves = bishopMove(square, board, color);
  const bishopMovePieces = bishopMoves.map((move) =>
    getPieceAtSquare(board, move)
  );
  for (const piece of bishopMovePieces) {
    if (!piece) continue;
    if (['b', 'q'].includes(piece.type) && piece.color !== color) return true;
  }

  const knightMoves = knightMove(square, board, color);
  const knightMovePieces = knightMoves.map((move) =>
    getPieceAtSquare(board, move)
  );
  for (const piece of knightMovePieces) {
    if (!piece) continue;
    if (piece.type === 'n' && piece.color !== color) return true;
  }

  const direction = getDirection(color);
  const pawnMoves = [];
  try {
    const leftDiagonal = getSquareAtOffset(square, -direction, direction);
    pawnMoves.push(leftDiagonal);
  } catch {
    0;
  }
  try {
    const rightDiagonal = getSquareAtOffset(square, direction, direction);
    pawnMoves.push(rightDiagonal);
  } catch {
    0;
  }
  const pawnMovePieces = pawnMoves.map((move) => getPieceAtSquare(board, move));
  if (square.file === 'd') console.log({ pawnMoves, pawnMovePieces });
  for (const piece of pawnMovePieces) {
    if (!piece) continue;
    if (piece.type === 'p' && piece.color !== color) return true;
  }

  return false;
}
