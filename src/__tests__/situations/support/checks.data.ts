import { Board, Coordinate } from '../../../utils/board/board.types';
import { createBoard } from '../../../utils/board/editor/boardEditor';
import { MoveCoordinate } from '../../__utils__/squareInteraction';

export interface BoardAndManyMoves {
  board: Board;
  preTestMoves?: MoveCoordinate[];
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

export const doubleChecks = [
  {
    board: createBoard({
      position: {
        wk: ['e2'],
        wn: ['d2'],
        wr: ['g3'],
        wq: ['d4'],
        bb: ['b5'],
        wb: ['d5'],
        br: ['e7'],
      },
    }),
    expectedMovesByCoordinate: {
      e2: ['d1', 'f2', 'f3'],
      d2: [],
      g3: [],
      d4: [],
      b5: [],
      d5: [],
      e7: [],
    },
  },
  {
    board: createBoard({
      position: {
        bk: ['e2'],
        bn: ['d2'],
        br: ['g3'],
        bq: ['d4'],
        wb: ['b5'],
        bb: ['d5'],
        wr: ['e7'],
      },
    }),
    expectedMovesByCoordinate: {
      e2: ['d1', 'f2', 'f3'],
      d2: [],
      g3: [],
      d4: [],
      b5: [],
      d5: [],
      e7: [],
    },
  },
] as BoardAndManyMoves[];

export const pins = [
  {
    board: createBoard({
      position: {
        wk: ['e3'],
        wn: ['d4'],
        wr: ['e4'],
        bq: ['b6', 'e8'],
      },
    }),
    expectedMovesByCoordinate: {
      d4: [],
      e4: ['e5', 'e6', 'e7', 'e8'],
    },
  },
  {
    board: createBoard({
      position: {
        bk: ['e3'],
        bn: ['d4'],
        br: ['e4'],
        wq: ['b6', 'e8'],
      },
      state: { turn: 'b' },
    }),
    expectedMovesByCoordinate: {
      d4: [],
      e4: ['e5', 'e6', 'e7', 'e8'],
    },
  },
] as BoardAndManyMoves[];

export const checkmate = [
  {
    board: createBoard({}),
    preTestMoves: [
      { origin: 'f2', destination: 'f3' },
      { origin: 'e7', destination: 'e6' },
      { origin: 'g2', destination: 'g4' },
      { origin: 'd8', destination: 'h4' },
    ],
    expectedMovesByCoordinate: {
      a1: [],
      b1: [],
      c1: [],
      d1: [],
      e1: [],
      f1: [],
      g1: [],
      h1: [],
      a2: [],
      b2: [],
      c2: [],
      d2: [],
      h2: [],
      e2: [],
      f3: [],
      g4: [],
    },
  },
  {
    board: createBoard({}),
    preTestMoves: [
      { origin: 'a2', destination: 'a3' },
      { origin: 'f7', destination: 'f6' },
      { origin: 'e2', destination: 'e3' },
      { origin: 'g7', destination: 'g5' },
      { origin: 'd1', destination: 'h5' },
    ],
    expectedMovesByCoordinate: {
      g5: [],
      f6: [],
      a7: [],
      b7: [],
      c7: [],
      d7: [],
      e7: [],
      h7: [],
      a8: [],
      b8: [],
      c8: [],
      d8: [],
      e8: [],
      f8: [],
      g8: [],
      h8: [],
    },
  },
] as BoardAndManyMoves[];

export const stalemateNoMoves = [
  {
    board: createBoard({
      position: {
        wk: ['h1'],
        bq: ['e2'],
        wp: ['c5', 'h6'],
        bp: ['c6', 'h7'],
      },
      state: { turn: 'b' },
    }),
    preTestMoves: [{ origin: 'e2', destination: 'f2' }],
    expectedMovesByCoordinate: {
      h1: [],
      c5: [],
      h6: [],
    },
  },
  {
    board: createBoard({
      position: {
        bk: ['h1'],
        wq: ['e2'],
        wp: ['c5', 'h6'],
        bp: ['c6', 'h7'],
      },
    }),
    preTestMoves: [{ origin: 'e2', destination: 'f2' }],
    expectedMovesByCoordinate: {
      h1: [],
      c6: [],
      h7: [],
    },
  },
] as BoardAndManyMoves[];

export const notStalemateAlliesMove: BoardAndManyMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['h1'],
        bq: ['e2'],
        wp: ['f4'],
        bp: ['f6'],
      },
      state: { turn: 'b' },
    }),
    preTestMoves: [{ origin: 'e2', destination: 'f2' }],
    expectedMovesByCoordinate: {
      h1: [],
      f4: ['f5'],
    },
  },
  {
    board: createBoard({
      position: {
        bk: ['h1'],
        wq: ['e2'],
        wp: ['f4'],
        bp: ['f6'],
      },
    }),
    preTestMoves: [{ origin: 'e2', destination: 'f2' }],
    expectedMovesByCoordinate: {
      h1: [],
      f6: ['f5'],
    },
  },
];
