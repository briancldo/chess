import { getSquareAtOffset, getPieceAtSquare, ranks } from '../board';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';
import { attackDiagonal as pawnAttack } from './pawn';
import { computeRegularMoves as kingMoveRegular } from './king';
import { BoardDirection, BoardPosition, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';
import { CastleSide } from './moves.types';

export function getLegalSquaresInDirection(
  square: BoardSquare,
  position: BoardPosition,
  color: PieceColor,
  offsetDirection: [number, number]
) {
  const squares: BoardSquare[] = [];
  let currentSquare = square;
  const [offsetX, offsetY] = offsetDirection;
  let done = false;

  while (!done) {
    try {
      currentSquare = getSquareAtOffset(currentSquare, offsetX, offsetY);
      const currentSquarePiece = getPieceAtSquare(position, currentSquare);

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

export function excludeOccupiedSquares(
  squares: BoardSquare[],
  position: BoardPosition,
  color: PieceColor,
  options: { ignoreColor?: boolean } = {}
) {
  return squares.filter((square) => {
    const piece = getPieceAtSquare(position, square);

    if (!piece) return true;
    if (options.ignoreColor) return false;
    if (piece.color !== color) return true;

    return false;
  });
}

type CastlingPathSquaresData = {
  [color in PieceColor]: {
    [side in CastleSide]: BoardSquare[];
  };
};
export const castlingPathSquares: CastlingPathSquaresData = {
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

export function getDirection(color: PieceColor): BoardDirection {
  return color === 'w' ? 1 : -1;
}

export function isSquareAttacked(
  square: BoardSquare,
  position: BoardPosition,
  color: PieceColor
) {
  for (const pieceType of attackingPieceTypes) {
    const attacked = isSquareAttackedByPiece(
      pieceType,
      square,
      position,
      color
    );
    if (attacked) return true;
  }

  return false;
}

export const attackingPiecesData = {
  k: { getMoves: kingMoveRegular, pieces: ['k'] },
  r: { getMoves: rookMove, pieces: ['r', 'q'] },
  b: { getMoves: bishopMove, pieces: ['b', 'q'] },
  n: { getMoves: knightMove, pieces: ['n'] },
  p: { getMoves: pawnAttack, pieces: ['p'] },
};
type AttackingPieces = 'k' | 'r' | 'b' | 'n' | 'p';
const attackingPieceTypes = ['k', 'r', 'b', 'n', 'p'] as AttackingPieces[];

function isSquareAttackedByPiece(
  pieceType: AttackingPieces,
  square: BoardSquare,
  position: BoardPosition,
  color: PieceColor
) {
  const { getMoves, pieces } = attackingPiecesData[pieceType];
  const moves = getMoves(square, color, position);
  const movePieces = moves.map((move) => getPieceAtSquare(position, move));
  for (const piece of movePieces) {
    if (!piece) continue;
    if (pieces.includes(piece.type) && piece.color !== color) return true;
  }
  return false;
}
