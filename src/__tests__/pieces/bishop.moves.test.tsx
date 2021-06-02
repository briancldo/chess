import '@testing-library/jest-dom/extend-expect';
import { assertCandidateMoves } from './common.test.utils';

import * as data from './support/bishop.moves.data';

describe('#bishop.moves', () => {
  test('pure bishop moves', () => {
    assertCandidateMoves(data.pureBishopPositionsAndMoves);
  });

  test('range blocked by other pieces', () => {
    assertCandidateMoves(data.rangeBlockedPositionsAndMoves);
  });
});
