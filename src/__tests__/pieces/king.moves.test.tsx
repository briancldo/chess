import '@testing-library/jest-dom/extend-expect';
import { assertCandidateMoves, assertMadeMoves } from './common.test.utils';

import * as data from './support/king.moves.data';

describe('#king.moves', () => {
  describe('candidate moves', () => {
    test('pure moves', () => {
      assertCandidateMoves(data.pureKingPositionsAndMoves);
    });
  });

  describe('actual moves', () => {
    test('pure moves', () => {
      assertMadeMoves(data.pureKingPositionsAndMoves);
    });
  });
});
