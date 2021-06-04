import '@testing-library/jest-dom/extend-expect';
import { assertCandidateMoves, assertMadeMoves } from './common.test.utils';

import * as data from './support/rook.moves.data';

describe('#rook.moves', () => {
  describe('candidate moves', () => {
    test('pure rook moves', () => {
      assertCandidateMoves(data.pureRookPositionsAndMoves);
    });
  });

  describe('actual moves', () => {
    test('pure rook moves', () => {
      assertMadeMoves(data.pureRookPositionsAndMoves);
    });
  });
});
