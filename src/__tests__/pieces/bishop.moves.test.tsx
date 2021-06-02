import '@testing-library/jest-dom/extend-expect';
import { assertCorrectMoves } from './common.test.utils';

import * as data from './support/bishop.moves.data';

describe('#bishop.moves', () => {
  test('pure bishop moves', () => {
    assertCorrectMoves(data.pureBishopPositionsAndMoves);
  });

  test('range blocked by other pieces', () => {
    assertCorrectMoves(data.rangeBlockedPositionsAndMoves);
  });
});
