import { getPieceAtSquare, getSquareAtOffset, matchingSquares } from '../board';
import {
  Board,
  BoardDirection,
  BoardPosition,
  BoardSquare,
  BoardState,
} from '../board.types';
import { PieceColor } from '../pieces.types';
import { getDirection } from './utils';

const pawnMove = (square: BoardSquare, color: PieceColor, board: Board) => {
  const { position } = board;
  const candidates: BoardSquare[] = [];
  candidates.push(
    ...moveStraight(square, color, position),
    ...getAttackMoves(square, color, board)
  );

  return candidates;
};

export default pawnMove;

function moveStraight(
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition
) {
  const direction = getDirection(color);

  const oneSquare = moveStraightOnce(square, position, direction);
  if (oneSquare.length === 0) return [];
  const twoSquares = moveStraightTwice(square, position, direction);

  return [...oneSquare, ...twoSquares];
}

function moveStraightOnce(
  square: BoardSquare,
  position: BoardPosition,
  direction: BoardDirection
) {
  let oneSquareAhead;
  try {
    oneSquareAhead = getSquareAtOffset(square, 0, direction);
  } catch {
    return [];
  }

  const isSquareOccupied = getPieceAtSquare(position, oneSquareAhead);
  if (isSquareOccupied) return [];
  return [oneSquareAhead];
}

const startingRank = {
  1: 2,
  '-1': 7,
};
function moveStraightTwice(
  square: BoardSquare,
  position: BoardPosition,
  direction: BoardDirection
) {
  if (startingRank[direction] !== square.rank) return [];

  const twoSquaresAhead = getSquareAtOffset(square, 0, 2 * direction);
  const isSquareOccupied = getPieceAtSquare(position, twoSquaresAhead);
  if (isSquareOccupied) return [];
  return [twoSquaresAhead];
}

function getAttackMoves(square: BoardSquare, color: PieceColor, board: Board) {
  const { position, state } = board;
  const diagonalSquares = attackDiagonal(square, color, board);
  const enPassantSquares = attackEnPassant(square, color, position, state);

  return [...diagonalSquares, ...enPassantSquares];
}

export function attackDiagonal(
  square: BoardSquare,
  color: PieceColor,
  board: Board
) {
  const { position } = board;
  const leftDiagonalSquare = attackLeftDiagonal(square, color, position);
  const rightDiagonalSquare = attackRightDiagonal(square, color, position);
  return [...leftDiagonalSquare, ...rightDiagonalSquare];
}

function attackLeftDiagonal(
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition
) {
  const direction = getDirection(color);
  let leftDiagonalSquare;
  try {
    leftDiagonalSquare = getSquareAtOffset(square, -direction, direction);
  } catch {
    return [];
  }

  const leftDiagonalPiece = getPieceAtSquare(position, leftDiagonalSquare);
  if (!leftDiagonalPiece || leftDiagonalPiece.color === color) return [];
  return [leftDiagonalSquare];
}

function attackRightDiagonal(
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition
) {
  const direction = getDirection(color);
  let rightDiagonalSquare;
  try {
    rightDiagonalSquare = getSquareAtOffset(square, direction, direction);
  } catch {
    return [];
  }

  const rightDiagonalPiece = getPieceAtSquare(position, rightDiagonalSquare);
  if (!rightDiagonalPiece || rightDiagonalPiece.color === color) return [];
  return [rightDiagonalSquare];
}

function attackEnPassant(
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition,
  boardState: BoardState
) {
  const leftEnPassant = attackLeftEnPassant(
    square,
    color,
    position,
    boardState
  );
  const rightEnPassant = attackRightEnPassant(
    square,
    color,
    position,
    boardState
  );
  return [...leftEnPassant, ...rightEnPassant];
}

function attackLeftEnPassant(
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition,
  boardState: BoardState
) {
  const direction = getDirection(color);
  let leftSquare;
  try {
    leftSquare = getSquareAtOffset(square, -direction, 0);
  } catch {
    return [];
  }
  const leftSquarePiece = getPieceAtSquare(position, leftSquare);
  if (!boardState.enPassantSquare) return [];
  if (leftSquarePiece?.color === color) return [];
  if (!matchingSquares(boardState.enPassantSquare, leftSquare)) return [];

  const leftDiagonalSquare = getSquareAtOffset(square, -direction, direction);
  return [leftDiagonalSquare];
}

function attackRightEnPassant(
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition,
  boardState: BoardState
) {
  const direction = getDirection(color);
  let rightSquare;
  try {
    rightSquare = getSquareAtOffset(square, direction, 0);
  } catch {
    return [];
  }
  const rightSquarePiece = getPieceAtSquare(position, rightSquare);
  if (!boardState.enPassantSquare) return [];
  if (rightSquarePiece?.color === color) return [];
  if (!matchingSquares(boardState.enPassantSquare, rightSquare)) return [];

  const rightDiagonalSquare = getSquareAtOffset(square, direction, direction);
  return [rightDiagonalSquare];
}
