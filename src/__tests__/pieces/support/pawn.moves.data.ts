import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const firstMovePositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({ wp: ['c2'] }),
    }),
    testPieceSquare: 'c2',
    expectedMoves: ['c3', 'c4'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({ wp: ['h2'] }),
    }),
    testPieceSquare: 'h2',
    expectedMoves: ['h3', 'h4'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({ bp: ['b7'] }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'b7',
    expectedMoves: ['b6', 'b5'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({ bp: ['f7'] }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'f7',
    expectedMoves: ['f6', 'f5'],
  },
];
