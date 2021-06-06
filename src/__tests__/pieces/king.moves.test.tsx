import '@testing-library/jest-dom/extend-expect';
import { assertCandidateMoves, assertMadeMoves } from './common.test.utils';

import * as data from './support/king.moves.data';

describe('#king.moves', () => {
  describe('candidate moves', () => {
    test('pure moves', () => {
      assertCandidateMoves(data.pureKingPositionsAndMoves);
    });

    test('range blocked by other pieces', () => {
      assertCandidateMoves(data.rangeBlockedPositionsAndMoves);
    });

    test('move out of check', () => {
      assertCandidateMoves(data.moveOutOfCheckPositionsAndMoves);
    });
  });

  describe('actual moves', () => {
    test('pure moves', () => {
      assertMadeMoves(data.pureKingPositionsAndMoves);
    });

    test('range blocked by other pieces', () => {
      assertMadeMoves(data.rangeBlockedPositionsAndMoves);
    });

    test('move out of check', () => {
      assertMadeMoves(data.moveOutOfCheckPositionsAndMoves);
    });
  });
});
