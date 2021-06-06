import { createBoard } from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const pureRookPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wr: ['d5'],
      },
    }),
    testPieceSquare: 'd5',
    expectedMoves: [
      'd1',
      'd2',
      'd3',
      'd4',
      'e5',
      'f5',
      'g5',
      'h5',
      'c5',
      'b5',
      'a5',
      'd6',
      'd7',
      'd8',
    ],
  },
  {
    board: createBoard({
      position: {
        br: ['d5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd5',
    expectedMoves: [
      'd1',
      'd2',
      'd3',
      'd4',
      'e5',
      'f5',
      'g5',
      'h5',
      'c5',
      'b5',
      'a5',
      'd6',
      'd7',
      'd8',
    ],
  },
];

export const rangeBlockedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        bp: ['c1', 'b5', 'h5', 'c8'],
        wr: ['c5'],
      },
    }),
    testPieceSquare: 'c5',
    expectedMoves: [
      'c1',
      'c2',
      'c3',
      'c4',
      'b5',
      'h5',
      'd5',
      'e5',
      'f5',
      'g5',
      'c6',
      'c7',
      'c8',
    ],
  },
  {
    board: createBoard({
      position: {
        wp: ['c1', 'b5', 'h5', 'c8'],
        br: ['c5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'c5',
    expectedMoves: [
      'c1',
      'c2',
      'c3',
      'c4',
      'b5',
      'h5',
      'd5',
      'e5',
      'f5',
      'g5',
      'c6',
      'c7',
      'c8',
    ],
  },
  {
    board: createBoard({
      position: {
        wp: ['c1', 'a5', 'h5', 'c8'],
        wr: ['c5'],
      },
    }),
    testPieceSquare: 'c5',
    expectedMoves: ['c2', 'c3', 'c4', 'b5', 'd5', 'e5', 'f5', 'g5', 'c6', 'c7'],
  },
  {
    board: createBoard({
      position: {
        bp: ['c1', 'a5', 'h5', 'c8'],
        br: ['c5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'c5',
    expectedMoves: ['c2', 'c3', 'c4', 'b5', 'd5', 'e5', 'f5', 'g5', 'c6', 'c7'],
  },
];
