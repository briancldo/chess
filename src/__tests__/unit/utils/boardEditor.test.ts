import '@testing-library/jest-dom';

import data from './support/boardEditor.data';
import {
  createBoard,
  createConcisePosition,
  PiecePlacements,
} from '../../../utils/board/boardEditor';
import { BoardPosition } from '../../../utils/board/board.types';

describe('#boardEditor', () => {
  describe('createBoard()', () => {
    test('sets position as given', () => {
      const position = [undefined, {}, {}, {}, {}, {}, {}, {}, {}];
      const board = createBoard({ position: position as BoardPosition });
      expect(board.position).toEqual([...position]);
    });

    // test('sets state as given');

    // test('sets default position if not given');

    // test('sets default state if not given');
  });

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
