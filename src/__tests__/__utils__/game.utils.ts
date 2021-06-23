import { screen } from '@testing-library/react';
import { CapturedPieces } from '../../utils/board/board.types';
import { PieceColor, PieceType } from '../../utils/pieces.types';

export function getCapturedPieces(): CapturedPieces;
export function getCapturedPieces(color: PieceColor): Partial<CapturedPieces>;
export function getCapturedPieces(color?: PieceColor): Partial<CapturedPieces> {
  const capturedPieces: Partial<CapturedPieces> = {};

  if (color !== 'w') capturedPieces.b = getCapturedPiecesColor('b');
  if (color !== 'b') capturedPieces.w = getCapturedPiecesColor('w');
  return capturedPieces;
}

function getCapturedPiecesColor(color: PieceColor) {
  const capturedPiecesElements = screen.queryAllByTestId(`captured-${color}`, {
    exact: false,
  });
  return capturedPiecesElements.map((capturedPiecesElement) => {
    const testId = capturedPiecesElement.getAttribute('data-testid') as string;
    return testId.split('-').pop() as PieceType;
  });
}

type AggregatedCapturedPiecesForColor = {
  [piece in PieceType]?: number;
};
export interface AggregatedCapturedPieces {
  w: AggregatedCapturedPiecesForColor;
  b: AggregatedCapturedPiecesForColor;
}
export function createCapturedPiecesAggregation(
  capturedPieces: CapturedPieces
): AggregatedCapturedPieces {
  const aggCapturedPieces: AggregatedCapturedPieces = { w: {}, b: {} };

  aggCapturedPieces.w = createCapturedPiecesAggregationForColor(
    capturedPieces,
    'w'
  );
  aggCapturedPieces.b = createCapturedPiecesAggregationForColor(
    capturedPieces,
    'b'
  );
  return aggCapturedPieces;
}

function createCapturedPiecesAggregationForColor(
  capturedPieces: CapturedPieces,
  color: PieceColor
): AggregatedCapturedPiecesForColor {
  // eslint-disable-next-line unicorn/no-array-reduce
  return capturedPieces[color].reduce((acc, pieceType) => {
    acc[pieceType] = (acc[pieceType] || 0) + 1;
    return acc;
  }, {} as AggregatedCapturedPiecesForColor);
}
