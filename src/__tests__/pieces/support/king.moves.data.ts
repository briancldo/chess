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
