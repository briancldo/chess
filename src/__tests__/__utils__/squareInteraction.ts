import { screen } from '@testing-library/react';
import { Coordinate } from '../../utils/board/board.types';
import { Piece } from '../../utils/pieces.types';

export interface SquareMetadata {
  coordinate: Coordinate;
  containingPiece?: Piece;
  highlighted: boolean;
  light: boolean;
}
export function getSquareMetadata(coordinate: Coordinate) {
  const squareWrapper = screen.getByTestId(coordinate);
  return squareWrapper.attributes.getNamedItem('data-test');
}
