import { Coordinate } from '../../../utils/board/board.types';
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

export const oneSquareForwardCoordinates: Coordinate[] = [
  'a3',
  'a4',
  'a5',
  'a6',
  'b3',
  'b4',
  'b5',
  'b6',
  'c3',
  'c4',
  'c5',
  'c6',
  'd3',
  'd4',
  'd5',
  'd6',
  'e3',
  'e4',
  'e5',
  'e6',
  'f3',
  'f4',
  'f5',
  'f6',
  'g3',
  'g4',
  'g5',
  'g6',
  'h3',
  'h4',
  'h5',
  'h6',
];

export const rangeBlockedPositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d2'],
        bp: ['d3'],
      }),
    }),
    testPieceSquare: 'd2',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d2'],
        bp: ['d4'],
      }),
    }),
    testPieceSquare: 'd2',
    expectedMoves: ['d3'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d4'],
        bp: ['d5'],
      }),
    }),
    testPieceSquare: 'd4',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d6'],
        bp: ['d7'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd7',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d5'],
        bp: ['d7'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd7',
    expectedMoves: ['d6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d4'],
        bp: ['d5'],
      }),
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd7',
    expectedMoves: [],
  },
];

export const enPassantPositionAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d5'],
        bp: ['e7'],
      }),
      state: { turn: 'b' },
    }),
    preTestMoves: [{ origin: 'e7', destination: 'e5' }],
    testPieceSquare: 'd5',
    expectedMoves: ['d6', 'e6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['d5'],
        bp: ['c7'],
      }),
      state: { turn: 'b' },
    }),
    preTestMoves: [{ origin: 'c7', destination: 'c5' }],
    testPieceSquare: 'd5',
    expectedMoves: ['d6', 'c6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['g2', 'd5'],
        bp: ['e7', 'c7'],
      }),
      state: { turn: 'b' },
    }),
    preTestMoves: [
      { origin: 'e7', destination: 'e5' },
      { origin: 'g2', destination: 'g3' },
      { origin: 'c7', destination: 'c5' },
    ],
    testPieceSquare: 'd5',
    expectedMoves: ['d6', 'c6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['a2', 'd5'],
        bp: ['e7'],
      }),
      state: { turn: 'b' },
    }),
    preTestMoves: [
      { origin: 'e7', destination: 'e5' },
      { origin: 'a2', destination: 'a3' },
      { origin: 'e5', destination: 'e4' },
    ],
    testPieceSquare: 'd5',
    expectedMoves: ['d6'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['e2'],
        bp: ['d4'],
      }),
      state: { turn: 'w' },
    }),
    preTestMoves: [{ origin: 'e2', destination: 'e4' }],
    testPieceSquare: 'd4',
    expectedMoves: ['d3', 'e3'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['c2'],
        bp: ['d4'],
      }),
      state: { turn: 'w' },
    }),
    preTestMoves: [{ origin: 'c2', destination: 'c4' }],
    testPieceSquare: 'd4',
    expectedMoves: ['d3', 'c3'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['e2', 'c2'],
        bp: ['d4', 'h7'],
      }),
      state: { turn: 'w' },
    }),
    preTestMoves: [
      { origin: 'c2', destination: 'c4' },
      { origin: 'h7', destination: 'h6' },
      { origin: 'e2', destination: 'e4' },
    ],
    testPieceSquare: 'd4',
    expectedMoves: ['d3', 'e3'],
  },
  {
    board: createBoard({
      position: createFromConcisePosition({
        wp: ['e2'],
        bp: ['d4', 'a7'],
      }),
      state: { turn: 'w' },
    }),
    preTestMoves: [
      { origin: 'e2', destination: 'e4' },
      { origin: 'a7', destination: 'a6' },
      { origin: 'e4', destination: 'e5' },
    ],
    testPieceSquare: 'd4',
    expectedMoves: ['d3'],
  },
];
