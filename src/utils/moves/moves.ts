import { getCheckedSide } from '../board';
import { excludeNonCheckHandlingSquares } from './checks';

import kingMove from './king';
import queenMove from './queen';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';
import pawnMove from './pawn';
import { Board, BoardSquare } from '../board.types';
import { Piece, PieceType } from '../pieces.types';
import { PieceMoveHandler } from './moves.types';

export { default as makeMove } from './makeMoves';
export function getPieceLegalMoves(
  board: Board,
  square: BoardSquare,
  piece: Piece
) {
  let candidates = computeCandidateSquares[piece.type](
    square,
    piece.color,
    board
  );

  if (getCheckedSide(board.state))
    candidates = excludeNonCheckHandlingSquares(candidates, board.state, piece);
  return candidates;
}

const computeCandidateSquares: Record<PieceType, PieceMoveHandler> = {
  k: kingMove,
  q: queenMove,
  r: rookMove,
  b: bishopMove,
  n: knightMove,
  p: pawnMove,
};
