import '@testing-library/jest-dom';

import data from './support/boardEditor.data';
import initBoard from '../../../utils/board/board.init';
import {
  createBoard,
  createFromConcisePosition,
  PiecePlacements,
} from '../../../utils/board/boardEditor';
import { BoardPosition, BoardSubstate } from '../../../utils/board/board.types';

describe('#boardEditor', () => {
  describe('createBoard()', () => {
    test('sets position as given', () => {
      const position = [undefined, {}, {}, {}, {}, {}, {}, {}, {}];
      const board = createBoard({ position: position as BoardPosition });
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

    test('given position and state', () => {
      const position = [undefined, {}, {}, {}, {}, {}, {}, {}, {}];
      const state: BoardSubstate = {
        turn: 'b',
        enPassantSquare: { rank: 4, file: 'e' },
      };
      const board = createBoard({ position: position as BoardPosition, state });
      expect(board).toEqual({
        position: [...position],
        state: data.stateModified,
      });
    });

    test('sets default position and state if not given', () => {
      const board = createBoard({});
      expect(board).toEqual(initBoard);
    });
  });

  describe('createFromConcisePosition()', () => {
    test('correctly sets up position', () => {
      for (let i = 0; i < data.concisePositions.length; i++) {
        const concisePosition = data.concisePositions[i] as PiecePlacements;
        const position = createFromConcisePosition(concisePosition);
        expect(position).toEqual(data.concisePositionResults[i]);
      }
    });

    test('can be used with createBoard', () => {
      for (let i = 0; i < data.concisePositions.length; i++) {
        const concisePosition = data.concisePositions[i] as PiecePlacements;
        const position = createFromConcisePosition(concisePosition);
        const board = createBoard({ position });
        expect(board).toEqual({
          position: data.concisePositionResults[i],
          state: expect.anything(),
        });
      }
    });
  });
});
