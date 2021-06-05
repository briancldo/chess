import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { coordinateToSquare } from '../../utils/board/board';
import { Coordinate } from '../../utils/board/board.types';
import { DevError } from '../../utils/errors';
import { Piece } from '../../utils/pieces.types';

function getSquareElement(coordinate: Coordinate) {
  return screen.getByTestId(coordinate);
}

export interface SquareMetadata {
  coordinate: Coordinate;
  containingPiece?: Piece;
  highlighted: boolean;
  light: boolean;
}
export function getSquareMetadata(coordinate: Coordinate) {
  const squareElement = getSquareElement(coordinate);
  const metadataString = squareElement.getAttribute('data-test');
  if (!metadataString) throw new DevError('No metadata');
  return JSON.parse(metadataString) as SquareMetadata;
}

const evenFiles = new Set(['b', 'd', 'f', 'h']);
export function shouldSquareBeLight(coordinate: Coordinate) {
  const square = coordinateToSquare(coordinate);
  const { rank, file } = square;

  const isEvenRank = rank % 2 === 0;
  const isEvenFile = evenFiles.has(file);
  return isEvenRank !== isEvenFile;
}

export function clickSquare(coordinate: Coordinate) {
  userEvent.click(getSquareElement(coordinate));
}

export interface MoveCoordinates {
  origin: Coordinate;
  destination: Coordinate;
}

export function makeMove(origin: Coordinate, destination: Coordinate) {
  clickSquare(origin);
  clickSquare(destination);
}

export function makeMoves(moves: MoveCoordinates[]) {
  for (const move of moves) {
    makeMove(move.origin, move.destination);
  }
}
