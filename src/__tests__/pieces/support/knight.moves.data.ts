import { createBoard } from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const happyPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wn: ['d5'],
      },
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['e3', 'c3', 'f4', 'b4', 'b6', 'f6', 'c7', 'e7'],
  },
  {
    board: createBoard({
      position: {
        bn: ['c4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'c4',
    expectedMoves: ['d2', 'b2', 'e3', 'a3', 'e5', 'a5', 'd6', 'b6'],
  },
];

export const otherPieceOccupyPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        bp: ['e2', 'b3', 'f5', 'c6'],
        wp: ['c2', 'f3', 'b5', 'e6'],
        bn: ['d4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'f3', 'b5', 'e6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['e2', 'b3', 'f5', 'c6'],
        bp: ['c2', 'f3', 'b5', 'e6'],
        wn: ['d4'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'f3', 'b5', 'e6'],
  },
  {
    board: createBoard({
      position: {
        bp: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
        bn: ['d4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: {
        wp: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
        wn: ['d4'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: {
        bp: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
        wn: ['d4'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
        bn: ['d4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
  },
];

export const offsideMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: { wn: ['g7'] },
    }),
    testPieceSquare: 'g7',
    expectedMoves: ['f5', 'h5', 'e6', 'e8'],
  },
  {
    board: createBoard({
      position: { bn: ['g7'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'g7',
    expectedMoves: ['f5', 'h5', 'e6', 'e8'],
  },
  {
    board: createBoard({
      position: { wn: ['h1'] },
    }),
    testPieceSquare: 'h1',
    expectedMoves: ['f2', 'g3'],
  },
  {
    board: createBoard({
      position: { bn: ['h1'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'h1',
    expectedMoves: ['f2', 'g3'],
  },
];

export const hopOverOthersPositionAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        bp: ['e3', 'd3', 'c3', 'e4', 'c4', 'c5', 'd5', 'e5'],
        wn: ['d4'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['e3', 'd3', 'c3', 'e4', 'c4', 'c5', 'd5', 'e5'],
        wn: ['d4'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['e3', 'd3', 'c3', 'e4', 'c4', 'c5', 'd5', 'e5'],
        bn: ['d4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
  },
  {
    board: createBoard({
      position: {
        bp: ['e3', 'd3', 'c3', 'e4', 'c4', 'c5', 'd5', 'e5'],
        bn: ['d4'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'b5', 'f5', 'c6', 'e6'],
  },
];
