import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const pureBishopPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({
        wb: ['d5'],
      }),
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
      position: createFromConcisePosition({
        bb: ['d5'],
      }),
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
      position: createFromConcisePosition({
        wb: ['a8'],
      }),
    }),
    testPieceSquare: 'a8',
    expectedMoves: ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        bb: ['a8'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'a8',
    expectedMoves: ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wb: ['d1'],
      }),
    }),
    testPieceSquare: 'd1',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'a4', 'g4', 'h5'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        bb: ['d1'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd1',
    expectedMoves: ['c2', 'e2', 'b3', 'f3', 'a4', 'g4', 'h5'],
  },
];
