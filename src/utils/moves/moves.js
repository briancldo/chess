import { getPieceAtSquare } from '../board';
import kingMove from './king';
import pawnMove from './pawn';

function getPieceLegalMoves(board, square) {
  const piece = getPieceAtSquare(board, square, { object: true });
  return computeCandidateSquares[piece.type](square, board, piece.color);
}

const movePlaceholder = () => [];

const computeCandidateSquares = {
  k: kingMove,
  q: movePlaceholder,
  r: movePlaceholder,
  b: movePlaceholder,
  n: movePlaceholder,
  p: pawnMove,
};

export { getPieceLegalMoves };
