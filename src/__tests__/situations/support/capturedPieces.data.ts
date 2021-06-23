import { Board, CapturedPieces } from '../../../utils/board/board.types';
import { createBoard } from '../../../utils/board/editor/boardEditor';
import { MoveCoordinate } from '../../__utils__/squareInteraction';

interface CapturedPiecesData {
  board: Board;
  movesAndAssertions: {
    move: MoveCoordinate;
    expectedCapturedPieces: CapturedPieces;
  }[];
}

export const displaysCorrectPieces: CapturedPiecesData[] = [
  {
    board: createBoard({
      position: {
        wq: ['e2'],
        wb: ['c4'],
        wp: ['f5'],
        bq: ['e6'],
        br: ['b6'],
        bn: ['g7'],
        bp: ['d7'],
      },
    }),
    movesAndAssertions: [
      {
        move: { origin: 'e2', destination: 'e6' },
        // keep all captured pieces lists in the proper order; some tests depend on that
        expectedCapturedPieces: {
          w: [],
          b: ['q'],
        },
      },
      {
        move: { origin: 'b6', destination: 'e6' },
        expectedCapturedPieces: {
          w: ['q'],
          b: ['q'],
        },
      },
      {
        move: { origin: 'c4', destination: 'e6' },
        expectedCapturedPieces: {
          w: ['q'],
          b: ['r', 'q'],
        },
      },
      {
        move: { origin: 'g7', destination: 'e6' },
        expectedCapturedPieces: {
          w: ['b', 'q'],
          b: ['r', 'q'],
        },
      },
      {
        move: { origin: 'f5', destination: 'e6' },
        expectedCapturedPieces: {
          w: ['b', 'q'],
          b: ['n', 'r', 'q'],
        },
      },
      {
        move: { origin: 'd7', destination: 'e6' },
        expectedCapturedPieces: {
          w: ['p', 'b', 'q'],
          b: ['n', 'r', 'q'],
        },
      },
    ],
  },
];
