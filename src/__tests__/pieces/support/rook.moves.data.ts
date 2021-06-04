import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export const pureRookPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({
        wr: ['d5'],
      }),
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
      position: createFromConcisePosition({
        br: ['d5'],
      }),
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
