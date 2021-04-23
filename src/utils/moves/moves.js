import { produce } from 'immer';
import { getPieceAtSquare, validateSquare } from '../board';
import { excludeOccupiedSquares } from './utils';
import { DevError } from '../errors';
import config from '../../config/config';

import kingMove from './king';
import queenMove from './queen';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';
import pawnMove from './pawn';

const piecesNeedExcludeLogic = new Set(['k', 'n', 'p']);

export function getPieceLegalMoves(board, square, piece) {
  if (!piece) piece = getPieceAtSquare(board, square);
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

  return produce(board, (draft) => {
    // this order is neccessary
    draft[end.rank][end.file] = piece;
    handleSpecialCases(draft, piece, { start, end });
    draft[start.rank][start.file] = undefined;
  });
}

function handleSpecialCases(draft, piece, squares) {
  handleEnPassant(draft, piece, squares);
  handlePawnPromotion(draft, piece, squares.end);
}

function handleEnPassant(draft, piece, squares) {
  const { start, end } = squares;

  let isEnPassantSquare;
  let capturedEnPassant;
  if (piece.type === 'p') {
    isEnPassantSquare = Math.abs(end.rank - start.rank) === 2;
    capturedEnPassant =
      start.file !== end.file && getPieceAtSquare(draft, end) === undefined;
  }

  if (capturedEnPassant) {
    const { rank, file } = draft[0].enPassantSquare;
    draft[rank][file] = undefined;
  }
  draft[0].enPassantSquare = isEnPassantSquare ? end : undefined;
}

function handlePawnPromotion(draft, piece, end) {
  if (piece.type !== 'p') return;

  if (end.rank === backRank[piece.color])
    draft[end.rank][end.file] = promotePawn(piece.color);
}

function promotePawn(color) {
  let promotionPiece;
  do {
    promotionPiece = prompt(`Promote to: (${promotionPieces.join(', ')})`);
  } while (!promotionPieces.includes(promotionPiece));

  return { type: promotionPiece, color };
}
