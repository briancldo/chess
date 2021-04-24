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
      { rank: ranks.last, file: 'b' },
      { rank: ranks.last, file: 'c' },
      { rank: ranks.last, file: 'd' },
    ],
    k: [
      { rank: ranks.last, file: 'f' },
      { rank: ranks.last, file: 'g' },
    ],
  },
};

export function getDirection(color) {
  return color === 'w' ? 1 : -1;
}

export function isSquareAttacked(square, board, color) {
  for (const piece of ['r', 'b', 'n', 'p']) {
    const attacked = isSquareAttackedByPiece(piece, square, board, color);
    if (attacked) return true;
  }

  return false;
}

const attackingPiecesData = {
  r: { getMoves: rookMove, pieces: ['r', 'q'] },
  b: { getMoves: bishopMove, pieces: ['b', 'q'] },
  n: { getMoves: knightMove, pieces: ['n'] },
  p: {
    getMoves: (square, board, color) => {
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
      return pawnMoves;
    },
    pieces: ['p'],
  },
};

function isSquareAttackedByPiece(piece, square, board, color) {
  const { getMoves, pieces } = attackingPiecesData[piece];
  const moves = getMoves(square, board, color);
  const movePieces = moves.map((move) => getPieceAtSquare(board, move));
  for (const piece of movePieces) {
    if (!piece) continue;
    if (pieces.includes(piece.type) && piece.color !== color) return true;
  }
  return false;
}
