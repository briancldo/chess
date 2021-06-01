import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';
import { BoardAndMoves } from '../common.test.utils';

export default {
  happyPositionsAndMoves: [
    {
      board: createBoard({
        position: createFromConcisePosition({
          wn: ['d5'],
        }),
      }),
      testPieceSquare: 'd5',
      expectedMoves: ['e3', 'c3', 'f4', 'b4', 'b6', 'f6', 'c7', 'e7'],
    },
    {
      board: createBoard({
        position: createFromConcisePosition({
          bn: ['c4'],
        }),
        state: { turn: 'b' },
      }),
      testPieceSquare: 'c4',
      expectedMoves: ['d2', 'b2', 'e3', 'a3', 'e5', 'a5', 'd6', 'b6'],
    },
  ] as BoardAndMoves[],
  otherPieceOccupyPositionsAndMoves: [
    {
      board: createBoard({
        position: createFromConcisePosition({
          bp: ['e2', 'b3', 'f5', 'c6'],
          wp: ['c2', 'f3', 'b5', 'e6'],
          bn: ['d4'],
        }),
        state: { turn: 'b' },
      }),
      testPieceSquare: 'd4',
      expectedMoves: ['c2', 'f3', 'b5', 'e6'],
    },
  ] as BoardAndMoves[],
};
