import { produce } from 'immer';
import { getPieceAtSquare, validateSquare } from '../board';
import { DevError } from '../errors';

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

export function makeMove(board, start, end) {
  validateSquare(start);
  validateSquare(end);

  const piece = getPieceAtSquare(board, start);
  if (!piece)
    throw new DevError(`No piece at start square ${JSON.stringify(start)}`);

  return produce(board, (draft) => {
    draft[end.rank][end.file] = piece;
    draft[start.rank][start.file] = undefined;
  });
}
