import { Board, Coordinate } from '../../../utils/board/board.types';
import { createBoard } from '../../../utils/board/editor/boardEditor';
import { MoveCoordinates } from '../../__utils__/squareInteraction';

export interface BoardAndManyMoves {
  board: Board;
  preTestMoves?: MoveCoordinates[];
  expectedMovesByCoordinate: { [coordinate in Coordinate]?: Coordinate[] };
}

export const singleCheckBlockAttacker = [
  {
    board: createBoard({
      position: {
        wp: ['f2'],
        wb: ['e2'],
        wk: ['h3'],
        bq: ['a3'],
        wn: ['e5'],
        wq: ['d5'],
        wr: ['c7'],
      },
    }),
    expectedMovesByCoordinate: {
      f2: ['f3'],
      e2: ['d3', 'f3'],
      e5: ['d3', 'f3'],
      d5: ['b3', 'd3', 'f3'],
      c7: ['c3'],
    },
  },
  {
    board: createBoard({
      position: {
        bp: ['f7'],
        bb: ['e7'],
        bk: ['h6'],
        wq: ['a6'],
        bn: ['e4'],
        bq: ['d4'],
        br: ['c2'],
      },
      state: { turn: 'b' },
    }),
    expectedMovesByCoordinate: {
      f7: ['f6'],
      e7: ['d6', 'f6'],
      e4: ['d6', 'f6'],
      d4: ['b6', 'd6', 'f6'],
      c2: ['c6'],
    },
  },
] as BoardAndManyMoves[];

export const singleCheckCaptureAttacker = [
  {
    board: createBoard({
      position: {
        wq: ['f1'],
        wn: ['f2'],
        wp: ['c2'],
        wk: ['h3'],
        bq: ['d3'],
        wb: ['b5'],
        wr: ['d8'],
      },
    }),
    expectedMovesByCoordinate: {
      f1: ['d3'],
      f2: ['d3'],
      c2: ['d3'],
      b5: ['d3'],
      d8: ['d3'],
    },
  },
  {
    board: createBoard({
      position: {
        bq: ['f8'],
        bn: ['f7'],
        bp: ['c7'],
        bk: ['h6'],
        wq: ['d6'],
        bb: ['b4'],
        br: ['d1'],
      },
      state: { turn: 'b' },
    }),
    expectedMovesByCoordinate: {
      f8: ['d6'],
      f7: ['d6'],
      c7: ['d6'],
      b4: ['d6'],
      d1: ['d6'],
    },
  },
] as BoardAndManyMoves[];

export const singleCheckKingMove = [
  {
    board: createBoard({
      position: {
        wk: ['e3'],
        bq: ['b6'],
      },
    }),
    expectedMovesByCoordinate: {
      e3: ['e2', 'd2', 'd3', 'f3', 'e4', 'f4'],
    },
  },
  {
    board: createBoard({
      position: {
        wk: ['e3'],
        bq: ['e7'],
      },
    }),
    expectedMovesByCoordinate: {
      e3: ['d2', 'f2', 'd3', 'f3', 'f4', 'd4'],
    },
  },
  {
    board: createBoard({
      position: {
        bk: ['e3'],
        wq: ['b6'],
      },
      state: { turn: 'b' },
    }),
    expectedMovesByCoordinate: {
      e3: ['e2', 'd2', 'd3', 'f3', 'e4', 'f4'],
    },
  },
  {
    board: createBoard({
      position: {
        bk: ['e3'],
        wq: ['e7'],
      },
      state: { turn: 'b' },
    }),
    expectedMovesByCoordinate: {
      e3: ['d2', 'f2', 'd3', 'f3', 'f4', 'd4'],
    },
  },
] as BoardAndManyMoves[];
