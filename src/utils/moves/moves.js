import { getPieceAtSquare } from '../board';
import kingMove from './king';
import pawnMove from './pawn';

function getPieceLegalMoves(board, square) {
  const piece = getPieceAtSquare(board, square, { object: true });
  return computeCandidateSquares[piece.type](square, board, piece.color);
}

const computeCandidateSquares = {
  k: kingMove,
  p: pawnMove,
};

export { getPieceLegalMoves };
