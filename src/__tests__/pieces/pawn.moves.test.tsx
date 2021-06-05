import '@testing-library/jest-dom/extend-expect';
import { assertCandidateMoves } from './common.test.utils';

import * as data from './support/pawn.moves.data';

describe('#pawn.moves', () => {
  describe('candidate moves', () => {
    test('move one or two squares on first move', () => {
      assertCandidateMoves(data.firstMovePositionsAndMoves);
    });
  });
});
