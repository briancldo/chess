import '@testing-library/jest-dom';

import data from './support/boardEditor.data';
import {
  createConcisePosition,
  PiecePlacements,
} from '../../../utils/boardEditor';

describe('#boardEditor', () => {
  describe('createConcisePosition()', () => {
    test('correctly sets up position', () => {
      for (let i = 0; i < data.concisePositions.length; i++) {
        const concisePosition = data.concisePositions[i] as PiecePlacements;
        const position = createConcisePosition(concisePosition);
        expect(position).toEqual(data.concisePositionResults[i]);
      }
    });
  });
});
