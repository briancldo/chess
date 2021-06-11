import { createBoard } from '../../../utils/board/editor/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const pureBishopPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: { wb: ['d5'] },
    }),
    testPieceSquare: 'd5',
    expectedMoves: [
      'h1',
      'g2',
      'a2',
      'f3',
      'b3',
      'e4',
      'c4',
      'c6',
      'e6',
      'b7',
      'f7',
      'a8',
      'g8',
    ],
  },
  {
    board: createBoard({
      position: { bb: ['d5'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd5',
    expectedMoves: [
      'h1',
      'g2',
      'a2',
      'f3',
      'b3',
      'e4',
      'c4',
      'c6',
      'e6',
      'b7',
      'f7',
      'a8',
      'g8',
    ],
  },
  {
    board: createBoard({
      position: { wb: ['a8'] },
    }),
    testPieceSquare: 'a8',
    expectedMoves: ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7'],
  },
  {
    board: createBoard({
      position: { bb: ['a8'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'a8',
    expectedMoves: ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7'],
  },
  {
    board: createBoard({
      position: { wb: ['d1'] },
    }),
    testPieceSquare: 'd1',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'a4', 'g4', 'h5'],
  },
  {
    board: createBoard({
      position: { bb: ['d1'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd1',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'a4', 'g4', 'h5'],
  },
];

export const rangeBlockedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        bp: ['h1', 'a2', 'e6', 'b7'],
        wb: ['d5'],
      },
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['h1', 'a2', 'g2', 'b3', 'f3', 'c4', 'e4', 'c6', 'e6', 'b7'],
  },
  {
    board: createBoard({
      position: {
        wp: ['h1', 'a2', 'e6', 'b7'],
        bb: ['d5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['h1', 'a2', 'g2', 'b3', 'f3', 'c4', 'e4', 'c6', 'e6', 'b7'],
  },
  {
    board: createBoard({
      position: {
        wp: ['a1', 'h2', 'd6', 'g7'],
        wb: ['e5'],
      },
    }),
    testPieceSquare: 'e5',
    expectedMoves: ['b2', 'g3', 'c3', 'f4', 'd4', 'f6'],
  },
];
