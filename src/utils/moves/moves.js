import { getPieceAtSquare } from '../board';
import kingMove from './king';
import queenMove from './queen';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';
import pawnMove from './pawn';

const piecesNeedExcludeLogic = new Set(['k', 'n', 'p']);

export function getPieceLegalMoves(board, square) {
  const piece = getPieceAtSquare(board, square, { object: true });
  const candidates = computeCandidateSquares[piece.type](
    square,
    board,
    piece.color
  );

  if (!piecesNeedExcludeLogic.has(piece.type)) return candidates;
  return excludeOccupiedSquares(candidates, board, piece.color);
}

const computeCandidateSquares = {
  k: kingMove,
  q: queenMove,
  r: rookMove,
  b: bishopMove,
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
