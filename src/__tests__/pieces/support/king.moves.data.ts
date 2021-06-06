import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const pureKingPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({ wk: ['d5'] }),
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['e4', 'd4', 'c4', 'e5', 'c5', 'c6', 'd6', 'e6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({ wk: ['a1'] }),
    }),
    testPieceSquare: 'a1',
    expectedMoves: ['b1', 'a2', 'b2'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({ bk: ['d5'] }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd5',
    expectedMoves: ['e4', 'd4', 'c4', 'e5', 'c5', 'c6', 'd6', 'e6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({ bk: ['a1'] }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'a1',
    expectedMoves: ['b1', 'a2', 'b2'],
  },
];

export const rangeBlockedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({
        wk: ['d4'],
        wp: ['e4', 'd5', 'e5'],
      }),
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c3', 'd3', 'e3', 'c4', 'c5'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        bp: ['c3', 'd3', 'e3'],
        wk: ['d4'],
      }),
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c3', 'd3', 'e3', 'c4', 'e4', 'c5', 'e5', 'd5'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        bp: ['c3', 'd3', 'c4'],
        bk: ['d4'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['e3', 'e4', 'c5', 'd5', 'e5'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        bk: ['d4'],
        wp: ['c5', 'd5', 'e5'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd4',
    expectedMoves: ['c3', 'd3', 'e3', 'c4', 'e4', 'c5', 'e5', 'd5'],
  },
];
