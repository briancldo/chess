import { getPieceAtSquare, getCheckedSide } from '../board';
import {
  excludeNonCheckHandlingSquares,
  excludeCheckingSquares,
} from './checks';
import { excludeOccupiedSquares } from './utils';

import kingMove from './king';
import queenMove from './queen';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';
import pawnMove from './pawn';

const piecesNeedExcludeLogic = new Set(['k', 'n', 'p']);

export { default as makeMove } from './makeMoves';
export function getPieceLegalMoves(board, square, piece) {
  if (!piece) piece = getPieceAtSquare(board, square);
  let candidates = computeCandidateSquares[piece.type](
    square,
    board,
    piece.color
  );

  if (getCheckedSide(board))
    candidates = excludeNonCheckHandlingSquares(candidates, board, piece);
  if (!piecesNeedExcludeLogic.has(piece.type)) return candidates;

  if (piece.type === 'k')
    candidates = excludeCheckingSquares(candidates, board, piece.color);
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
