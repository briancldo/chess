import { produce } from 'immer';
import { getPieceAtSquare, validateSquare } from '../board';
import { DevError } from '../errors';
import config from '../../config/config';

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

const backRank = {
  w: config.get('board.dimensions.numberRanks'),
  b: 1,
};
const promotionPieces = ['q', 'r', 'b', 'n'];
export function makeMove(board, start, end) {
  validateSquare(start);
  validateSquare(end);

  let piece = getPieceAtSquare(board, start);
  if (!piece)
    throw new DevError(`No piece at start square ${JSON.stringify(start)}`);

  let enPassant;
  let capturedEnPassant;
  if (piece.type === 'p') {
    if (end.rank === backRank[piece.color]) piece = promotePawn(piece.color);
    enPassant = Math.abs(end.rank - start.rank) === 2;

    capturedEnPassant =
      start.file !== end.file && getPieceAtSquare(board, end) === undefined;
  }

  return produce(board, (draft) => {
    draft[end.rank][end.file] = piece;
    draft[start.rank][start.file] = undefined;

    if (capturedEnPassant) {
      const { rank, file } = draft[0].enPassant;
      draft[rank][file] = undefined;
    }
    draft[0].enPassant = enPassant ? end : undefined;
  });
}

function promotePawn(color) {
  let promotionPiece;
  do {
    promotionPiece = prompt(`Promote to: (${promotionPieces.join(', ')})`);
  } while (!promotionPieces.includes(promotionPiece));

  return { type: promotionPiece, color };
}
