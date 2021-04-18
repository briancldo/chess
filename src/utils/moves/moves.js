import { getPieceAtSquare } from '../board';
import kingMove from './king';
import knightMove from './knight';
import pawnMove from './pawn';

function getPieceLegalMoves(board, square) {
  const piece = getPieceAtSquare(board, square, { object: true });
  const candidates = computeCandidateSquares[piece.type](
    square,
    board,
    piece.color
  );

  return excludeOccupiedSquares(candidates, board, piece.color);
}

const movePlaceholder = () => [];

const computeCandidateSquares = {
  k: kingMove,
  q: movePlaceholder,
  r: movePlaceholder,
  b: movePlaceholder,
  n: knightMove,
  p: pawnMove,
};

function excludeOccupiedSquares(squares, board, color) {
  return squares.filter((square) => {
    const piece = getPieceAtSquare(board, square);
    if (!piece) return true;
    if (piece.color !== color) return true;

    return false;
  });
}

export { getPieceLegalMoves };
