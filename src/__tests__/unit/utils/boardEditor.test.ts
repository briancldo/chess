import '@testing-library/jest-dom';

import data from './support/boardEditor.data';
import initBoard from '../../../utils/board/board.init';
import {
  createBoard,
  createFromConcisePosition,
  ConcisePosition,
} from '../../../utils/board/boardEditor';
import { BoardSubstate } from '../../../utils/board/board.types';

describe('#boardEditor', () => {
  describe('createBoard()', () => {
    test('sets position as given', () => {
      const position = [null, {}, {}, {}, {}, {}, {}, {}, {}];
      const board = createBoard({ position: {} });
      expect(board.position).toEqual([...position]);
    });

    test('fills state with subset of properties', () => {
      const state: BoardSubstate = {
        turn: 'b',
        enPassantSquare: { rank: 4, file: 'e' },
      };
      const board = createBoard({ state });
      expect(board.state).toEqual(data.stateModified);
    });

    test('computes king state based on position', () => {
      for (const {
        board,
        resultingPosition,
        resultingState,
      } of data.kingStateSync) {
        expect(board.position).toEqual(resultingPosition);
        expect(board.state).toEqual(resultingState);
      }
    });

    test('given position and state', () => {
      const position = [null, {}, {}, {}, {}, {}, {}, {}, {}];
      const state: BoardSubstate = {
        turn: 'b',
        enPassantSquare: { rank: 4, file: 'e' },
      };
      const board = createBoard({ position: {}, state });
      expect(board).toEqual({
        position: [...position],
        state: data.stateModified,
      });
    });

    test('successive calls do not affect each other', () => {
      for (const {
        board,
        resultingPosition,
        resultingState,
      } of data.successiveCalls) {
        expect(board).toEqual({
          position: resultingPosition,
          state: resultingState,
        });
      }
    });

    test('sets default position and state if not given', () => {
      const board = createBoard({});
      expect(board).toEqual(initBoard);
    });
  });

  describe('createFromConcisePosition()', () => {
    test('correctly sets up position', () => {
      for (let i = 0; i < data.concisePositions.length; i++) {
        const concisePosition = data.concisePositions[i] as ConcisePosition;
        const position = createFromConcisePosition(concisePosition);
        expect(position).toEqual(data.concisePositionResults[i]);
      }
    });
  });
});
