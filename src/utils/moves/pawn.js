import { getPieceAtSquare, getSquareAtOffset, matchingSquares } from '../board';
import { getDirection } from './utils';

export default function pawnMove(square, board, color) {
  const candidates = [];
  candidates.push(
    ...moveStraight(square, board, color),
    ...attackDiagonally(square, board, color)
  );

  return candidates;
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

function attackDiagonally(square, board, color) {
  const leftDiagonalSquare = attackLeftDiagonal(square, board, color);
  const rightDiagonalSquare = attackRightDiagonal(square, board, color);
  const leftEnPassant = attackLeftEnPassant(square, board, color);
  const rightEnPassant = attackRightEnPassant(square, board, color);

  return [
    ...leftDiagonalSquare,
    ...rightDiagonalSquare,
    ...leftEnPassant,
    ...rightEnPassant,
  ];
}

function attackLeftDiagonal(square, board, color) {
  const direction = getDirection(color);
  let leftDiagonalSquare;
  try {
    leftDiagonalSquare = getSquareAtOffset(square, -direction, direction);
  } catch {
    return [];
  }

  const leftDiagonalPiece = getPieceAtSquare(board, leftDiagonalSquare);
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

  const rightDiagonalPiece = getPieceAtSquare(board, rightDiagonalSquare);
  if (!rightDiagonalPiece || rightDiagonalPiece.color === color) return [];
  return [rightDiagonalSquare];
}

function attackLeftEnPassant(square, board, color) {
  const direction = getDirection(color);
  let leftSquare;
  try {
    leftSquare = getSquareAtOffset(square, -direction, 0);
  } catch {
    return [];
  }
  const leftSquarePiece = getPieceAtSquare(board, leftSquare);
  if (!board[0].enPassantSquare) return [];
  if (leftSquarePiece?.color === color) return [];
  if (!matchingSquares(board[0].enPassantSquare, leftSquare)) return [];

  const leftDiagonalSquare = getSquareAtOffset(square, -direction, direction);
  return [leftDiagonalSquare];
}

function attackRightEnPassant(square, board, color) {
  const direction = getDirection(color);
  let rightSquare;
  try {
    rightSquare = getSquareAtOffset(square, direction, 0);
  } catch {
    return [];
  }
  const rightSquarePiece = getPieceAtSquare(board, rightSquare);
  if (!board[0].enPassantSquare) return [];
  if (rightSquarePiece?.color === color) return [];
  if (!matchingSquares(board[0].enPassantSquare, rightSquare)) return [];

  const rightDiagonalSquare = getSquareAtOffset(square, direction, direction);
  return [rightDiagonalSquare];
}
