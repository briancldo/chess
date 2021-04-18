import { getPieceAtSquare, getSquareAtOffset } from '../board';

export default function pawnMove(square, board, color) {
  const candidates = [];
  candidates.push(
    ...moveStraight(square, board, color),
    ...attackDiagonally(square, board, color)
  );

  return candidates;
}

function getDirection(color) {
  return color === 'w' ? 1 : -1;
}

function moveStraight(square, board, color) {
  const direction = getDirection(color);

  const oneSquare = moveStraightOnce(square, board, direction);
  if (oneSquare.length === 0) return [];
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

// TODO: en passant
function attackDiagonally(square, board, color) {
  const leftDiagonalSquare = attackLeftDiagonal(square, board, color);
  const rightDiagonalSquare = attackRightDiagonal(square, board, color);

  return [...leftDiagonalSquare, ...rightDiagonalSquare];
}

function attackLeftDiagonal(square, board, color) {
  const direction = getDirection(color);
  let leftDiagonalSquare;
  try {
    leftDiagonalSquare = getSquareAtOffset(square, -1 * direction, direction);
  } catch {
    return [];
  }

  const leftDiagonalPiece = getPieceAtSquare(board, leftDiagonalSquare, {
    object: true,
  });
  if (!leftDiagonalPiece || leftDiagonalPiece.color === color) return [];
  return [leftDiagonalSquare];
}

function attackRightDiagonal(square, board, color) {
  const direction = getDirection(color);
  let rightDiagonalSquare;
  try {
    rightDiagonalSquare = getSquareAtOffset(square, direction, direction);
  } catch {
    return [];
  }

  const rightDiagonalPiece = getPieceAtSquare(board, rightDiagonalSquare, {
    object: true,
  });
  if (!rightDiagonalPiece || rightDiagonalPiece.color === color) return [];
  return [rightDiagonalSquare];
}
