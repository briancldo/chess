import { Board, CapturedPieces } from '../../../utils/board/board.types';
import { createBoard } from '../../../utils/board/editor/boardEditor';
import { MoveCoordinate } from '../../__utils__/squareInteraction';

export interface CapturedPiecesData {
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

export const noCaptures: CapturedPiecesData[] = [
  {
    board: createBoard({
      position: {
        bp: ['f5', 'a7'],
        wr: ['c5'],
      },
    }),
    movesAndAssertions: [
      {
        move: { origin: 'c5', destination: 'd5' },
        expectedCapturedPieces: {
          w: [],
          b: [],
        },
      },
      {
        move: { origin: 'a7', destination: 'a6' },
        expectedCapturedPieces: {
          w: [],
          b: [],
        },
      },
      {
        move: { origin: 'd5', destination: 'f5' },
        expectedCapturedPieces: {
          w: [],
          b: ['p'],
        },
      },
      {
        move: { origin: 'a6', destination: 'a5' },
        expectedCapturedPieces: {
          w: [],
          b: ['p'],
        },
      },
      {
        move: { origin: 'f5', destination: 'f6' },
        expectedCapturedPieces: {
          w: [],
          b: ['p'],
        },
      },
    ],
  },
];

export const capturePromoted: CapturedPiecesData[] = [
  {
    board: createBoard({
      position: {
        wp: ['d7', 'e7', 'f7', 'g7'],
        br: ['a8'],
      },
    }),
    movesAndAssertions: [
      {
        move: { origin: 'd7', destination: 'd8', promotionPiece: 'q' },
        expectedCapturedPieces: {
          w: [],
          b: [],
        },
      },
      {
        move: { origin: 'a8', destination: 'd8' },
        expectedCapturedPieces: {
          w: ['p'],
          b: [],
        },
      },
      {
        move: { origin: 'e7', destination: 'e8', promotionPiece: 'r' },
        expectedCapturedPieces: {
          w: ['p'],
          b: [],
        },
      },
      {
        move: { origin: 'd8', destination: 'e8' },
        expectedCapturedPieces: {
          w: ['p', 'p'],
          b: [],
        },
      },
      {
        move: { origin: 'f7', destination: 'f8', promotionPiece: 'b' },
        expectedCapturedPieces: {
          w: ['p', 'p'],
          b: [],
        },
      },
      {
        move: { origin: 'e8', destination: 'f8' },
        expectedCapturedPieces: {
          w: ['p', 'p', 'p'],
          b: [],
        },
      },
      {
        move: { origin: 'g7', destination: 'g8', promotionPiece: 'n' },
        expectedCapturedPieces: {
          w: ['p', 'p', 'p'],
          b: [],
        },
      },
      {
        move: { origin: 'f8', destination: 'g8' },
        expectedCapturedPieces: {
          w: ['p', 'p', 'p', 'p'],
          b: [],
        },
      },
    ],
  },
];

export const gameOverMoves = {
  board: createBoard({
    position: {
      bb: ['c1'],
      wn: ['f2'],
      br: ['d3', 'a7'],
      bq: ['d5'],
      wp: ['c6', 'd7'],
      wk: ['h8'],
    },
  }),
  moves: [
    { origin: 'f2', destination: 'd3' },
    { origin: 'd5', destination: 'c6' },
    { origin: 'd3', destination: 'c1' },
    { origin: 'c6', destination: 'd7' },
    { origin: 'c1', destination: 'b3' },
    { origin: 'd7', destination: 'd8' },
  ] as MoveCoordinate[],
  expectedCapturedPieces: {
    w: ['p', 'p'],
    b: ['b', 'r'],
  } as CapturedPieces,
};

export const promotionCapture: CapturedPiecesData[] = [
  {
    board: createBoard({
      position: {
        wp: ['d7'],
        bn: ['c8'],
      },
    }),
    movesAndAssertions: [
      {
        move: { origin: 'd7', destination: 'c8', promotionPiece: 'q' },
        expectedCapturedPieces: {
          w: [],
          b: ['n'],
        },
      },
    ],
  },
  {
    board: createBoard({
      position: {
        bp: ['d2'],
        wr: ['c1'],
      },
    }),
    movesAndAssertions: [
      {
        move: { origin: 'd2', destination: 'c1', promotionPiece: 'b' },
        expectedCapturedPieces: {
          w: [],
          b: ['r'],
        },
      },
    ],
  },
];
