import { createBoard } from '../../../utils/board/editor/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const pureKingPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: { wk: ['d5'] },
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['e4', 'd4', 'c4', 'e5', 'c5', 'c6', 'd6', 'e6'],
  },
  {
    board: createBoard({
      position: { wk: ['a1'] },
    }),
    testPieceSquare: 'a1',
    expectedMoves: ['b1', 'a2', 'b2'],
  },
  {
    board: createBoard({
      position: { bk: ['d5'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['e4', 'd4', 'c4', 'e5', 'c5', 'c6', 'd6', 'e6'],
  },
  {
    board: createBoard({
      position: { bk: ['a1'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'a1',
    expectedMoves: ['b1', 'a2', 'b2'],
  },
];

export const rangeBlockedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['d4'],
        wp: ['e4', 'd5', 'e5'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c3', 'd3', 'e3', 'c4', 'c5'],
  },
  {
    board: createBoard({
      position: {
        bp: ['c3', 'd3', 'e3'],
        wk: ['d4'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c3', 'd3', 'e3', 'c4', 'e4', 'c5', 'e5', 'd5'],
  },
  {
    board: createBoard({
      position: {
        bp: ['c3', 'd3', 'c4'],
        bk: ['d4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['e3', 'e4', 'c5', 'd5', 'e5'],
  },
  {
    board: createBoard({
      position: {
        bk: ['d4'],
        wp: ['c5', 'd5', 'e5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c3', 'd3', 'e3', 'c4', 'e4', 'c5', 'e5', 'd5'],
  },
];

export const moveOutOfCheckPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        br: ['a1'],
      },
    }),
    testPieceSquare: 'e1',
    expectedMoves: ['d2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e1'],
        wr: ['a1'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e1',
    expectedMoves: ['d2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        wk: ['d3'],
        bq: ['b5'],
      },
    }),
    testPieceSquare: 'd3',
    expectedMoves: ['c2', 'd2', 'c3', 'e3', 'e4', 'd4'],
  },
  {
    board: createBoard({
      position: {
        bk: ['d3'],
        wq: ['b5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd3',
    expectedMoves: ['c2', 'd2', 'c3', 'e3', 'e4', 'd4'],
  },
  {
    board: createBoard({
      position: {
        wk: ['d3'],
        bb: ['h7'],
      },
    }),
    testPieceSquare: 'd3',
    expectedMoves: ['d2', 'e2', 'c3', 'e3', 'd4', 'c4'],
  },
  {
    board: createBoard({
      position: {
        bk: ['d3'],
        wb: ['h7'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd3',
    expectedMoves: ['d2', 'e2', 'c3', 'e3', 'd4', 'c4'],
  },
  {
    board: createBoard({
      position: {
        wk: ['d3'],
        bn: ['e5'],
      },
    }),
    testPieceSquare: 'd3',
    expectedMoves: ['c2', 'd2', 'e2', 'e3', 'c3', 'd4', 'e4'],
  },
  {
    board: createBoard({
      position: {
        bk: ['d3'],
        wn: ['e5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd3',
    expectedMoves: ['c2', 'd2', 'e2', 'e3', 'c3', 'd4', 'e4'],
  },
  {
    board: createBoard({
      position: {
        wk: ['d4'],
        bp: ['c5'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['e3', 'd3', 'c3', 'e4', 'c4', 'c5', 'd5', 'e5'],
  },
  {
    board: createBoard({
      position: {
        bk: ['d4'],
        wp: ['c5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['e3', 'd3', 'c3', 'e4', 'c4', 'c5', 'd5', 'e5'],
  },
];

export const moveSafeSquaresPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['c4'],
        bq: ['h5'],
        bb: ['a7'],
      },
    }),
    testPieceSquare: 'c4',
    expectedMoves: ['b3', 'c3', 'd3', 'b4'],
  },
  {
    board: createBoard({
      position: {
        bk: ['c4'],
        wq: ['h5'],
        wb: ['a7'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'c4',
    expectedMoves: ['b3', 'c3', 'd3', 'b4'],
  },
  {
    board: createBoard({
      position: {
        wk: ['d4'],
        bn: ['f4'],
        br: ['c8'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['e3', 'e4', 'e5'],
  },
  {
    board: createBoard({
      position: {
        bk: ['d4'],
        wn: ['f4'],
        wr: ['c8'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['e3', 'e4', 'e5'],
  },
];

export const pureCastlingPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
      },
    }),
    testPieceSquare: 'e1',
    expectedMoves: ['d1', 'c1', 'f1', 'g1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
      },
    }),
    testPieceSquare: 'e1',
    expectedMoves: ['d1', 'c1', 'f1', 'g1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['a8', 'h8'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e8',
    expectedMoves: ['d8', 'c8', 'f8', 'g8', 'd7', 'e7', 'f7'],
  },
];

export const castlingSquaresAttackedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
        bq: ['g6'],
      },
    }),
    testPieceSquare: 'e1',
    expectedMoves: ['d1', 'f1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['a1', 'h1'],
        bn: ['e2'],
      },
    }),
    testPieceSquare: 'e1',
    expectedMoves: ['d1', 'f1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['h8', 'a8'],
        wq: ['g3'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e8',
    expectedMoves: ['d8', 'f8', 'd7', 'e7', 'f7'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['a8', 'h8'],
        wn: ['e7'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e8',
    expectedMoves: ['d8', 'f8', 'd7', 'e7', 'f7'],
  },
];

export const castlingPiecesMovedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
        bp: ['b7'],
      },
    }),
    testPieceSquare: 'e1',
    preTestMoves: [
      { origin: 'e1', destination: 'e2' },
      { origin: 'b7', destination: 'b6' },
      { origin: 'e2', destination: 'e1' },
      { origin: 'b6', destination: 'b5' },
    ],
    expectedMoves: ['d1', 'f1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
        bp: ['b7'],
      },
    }),
    testPieceSquare: 'e1',
    preTestMoves: [
      { origin: 'h1', destination: 'h2' },
      { origin: 'b7', destination: 'b6' },
      { origin: 'h2', destination: 'h1' },
      { origin: 'b6', destination: 'b5' },
    ],
    expectedMoves: ['d1', 'c1', 'f1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
        bp: ['b7'],
      },
    }),
    testPieceSquare: 'e1',
    preTestMoves: [
      { origin: 'a1', destination: 'a2' },
      { origin: 'b7', destination: 'b6' },
      { origin: 'a2', destination: 'a1' },
      { origin: 'b6', destination: 'b5' },
    ],
    expectedMoves: ['d1', 'f1', 'g1', 'd2', 'e2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['h8', 'a8'],
        wp: ['b2'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e8',
    preTestMoves: [
      { origin: 'e8', destination: 'e7' },
      { origin: 'b2', destination: 'b3' },
      { origin: 'e7', destination: 'e8' },
      { origin: 'b3', destination: 'b4' },
    ],
    expectedMoves: ['d8', 'f8', 'd7', 'e7', 'f7'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['h8', 'a8'],
        wp: ['b2'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e8',
    preTestMoves: [
      { origin: 'h8', destination: 'h7' },
      { origin: 'b2', destination: 'b3' },
      { origin: 'h7', destination: 'h8' },
      { origin: 'b3', destination: 'b4' },
    ],
    expectedMoves: ['d8', 'c8', 'f8', 'd7', 'e7', 'f7'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['h8', 'a8'],
        wp: ['b2'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e8',
    preTestMoves: [
      { origin: 'a8', destination: 'a7' },
      { origin: 'b2', destination: 'b3' },
      { origin: 'a7', destination: 'a8' },
      { origin: 'b3', destination: 'b4' },
    ],
    expectedMoves: ['d8', 'f8', 'g8', 'd7', 'e7', 'f7'],
  },
];

export const castlingCheckPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wk: ['e1'],
        wr: ['h1', 'a1'],
        br: ['c8'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'e1',
    preTestMoves: [{ origin: 'c8', destination: 'e8' }],
    expectedMoves: ['d1', 'f1', 'd2', 'f2'],
  },
  {
    board: createBoard({
      position: {
        bk: ['e8'],
        br: ['h8', 'a8'],
        wr: ['c1'],
      },
    }),
    testPieceSquare: 'e8',
    preTestMoves: [{ origin: 'c1', destination: 'e1' }],
    expectedMoves: ['d8', 'f8', 'd7', 'f7'],
  },
];
