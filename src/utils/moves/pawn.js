import { getPieceAtSquare, getSquareAtOffset } from '../board';

export default function pawnMove(square, board, color) {
  const candidates = [];
  candidates.push(...moveStraight(square, board, color));

  return candidates;
}

function moveStraight(square, board, color) {
  const direction = color === 'w' ? 1 : -1;

  const oneSquare = moveStraightOnce(square, board, direction);
  const twoSquares = moveStraightTwice(square, board, direction);

  return [...oneSquare, ...twoSquares];
}

function moveStraightOnce(square, board, direction) {
  let oneSquareAhead;
  try {
    oneSquareAhead = getSquareAtOffset(square, 0, direction);
  } catch {
    return [];
  }

  const isSquareOccupied = getPieceAtSquare(board, oneSquareAhead);
  if (isSquareOccupied) return [];
  return [oneSquareAhead];
}

const startingRank = {
  1: 2,
  '-1': 7,
};
function moveStraightTwice(square, board, direction) {
  if (startingRank[direction] !== square.rank) return [];

  const twoSquaresAhead = getSquareAtOffset(square, 0, 2 * direction);
  const isSquareOccupied = getPieceAtSquare(board, twoSquaresAhead);
  if (isSquareOccupied) return [];
  return [twoSquaresAhead];
}
