import '@testing-library/jest-dom/extend-expect';
import { assertCandidateMoves, assertMadeMoves } from './common.test.utils';

import * as data from './support/queen.moves.data';

describe('#queen.moves', () => {
  describe('candidate moves', () => {
    test('pure moves', () => {
      assertCandidateMoves(data.pureQueenPositionAndMoves);
    });

    test('range blocked by other pieces', () => {
      assertCandidateMoves(data.rangeBlockedPositionsAndMoves);
    });
  });

  describe('actual moves', () => {
    test('pure moves', () => {
      assertMadeMoves(data.pureQueenPositionAndMoves);
    });

    test('range blocked by other pieces', () => {
      assertMadeMoves(data.rangeBlockedPositionsAndMoves);
    });
  });
});
