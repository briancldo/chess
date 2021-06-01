import { Board, Coordinate } from '../../../utils/board/board.types';
import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';

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
  ] as {
    board: Board;
    testPieceSquare: Coordinate;
    expectedMoves: Coordinate[];
  }[],
};
