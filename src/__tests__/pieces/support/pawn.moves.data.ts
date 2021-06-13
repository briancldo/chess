import { Board, Coordinate } from '../../../utils/board/board.types';
import { createBoard } from '../../../utils/board/editor/boardEditor';
import { PieceType } from '../../../utils/pieces.types';
import { MoveCoordinate } from '../../__utils__/squareInteraction';
import { BoardAndMoves } from '../common.test.utils';

export const firstMovePositionsAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: { wp: ['c2'] },
    }),
    testPieceSquare: 'c2',
    expectedMoves: ['c3', 'c4'],
  },
  {
    board: createBoard({
      position: { wp: ['h2'] },
    }),
    testPieceSquare: 'h2',
    expectedMoves: ['h3', 'h4'],
  },
  {
    board: createBoard({
      position: { bp: ['b7'] },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'b7',
    expectedMoves: ['b6', 'b5'],
  },
  {
    board: createBoard({
      position: { bp: ['f7'] },
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
      position: {
        wp: ['d2'],
        bp: ['d3'],
      },
    }),
    testPieceSquare: 'd2',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: {
        wp: ['d2'],
        bp: ['d4'],
      },
    }),
    testPieceSquare: 'd2',
    expectedMoves: ['d3'],
  },
  {
    board: createBoard({
      position: {
        wp: ['d4'],
        bp: ['d5'],
      },
    }),
    testPieceSquare: 'd4',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: {
        wp: ['d6'],
        bp: ['d7'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd7',
    expectedMoves: [],
  },
  {
    board: createBoard({
      position: {
        wp: ['d5'],
        bp: ['d7'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd7',
    expectedMoves: ['d6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['d4'],
        bp: ['d5'],
      },
      state: { turn: 'b' },
    }),
    testPieceSquare: 'd7',
    expectedMoves: [],
  },
];

export const enPassantPositionAndMoves: BoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wp: ['d5'],
        bp: ['e7'],
      },
      state: { turn: 'b' },
    }),
    preTestMoves: [{ origin: 'e7', destination: 'e5' }],
    testPieceSquare: 'd5',
    expectedMoves: ['d6', 'e6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['d5'],
        bp: ['c7'],
      },
      state: { turn: 'b' },
    }),
    preTestMoves: [{ origin: 'c7', destination: 'c5' }],
    testPieceSquare: 'd5',
    expectedMoves: ['d6', 'c6'],
  },
  {
    board: createBoard({
      position: {
        wp: ['g2', 'd5'],
        bp: ['e7', 'c7'],
      },
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
      position: {
        wp: ['a2', 'd5'],
        bp: ['e7'],
      },
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
      position: {
        wp: ['e2'],
        bp: ['d4'],
      },
      state: { turn: 'w' },
    }),
    preTestMoves: [{ origin: 'e2', destination: 'e4' }],
    testPieceSquare: 'd4',
    expectedMoves: ['d3', 'e3'],
  },
  {
    board: createBoard({
      position: {
        wp: ['c2'],
        bp: ['d4'],
      },
      state: { turn: 'w' },
    }),
    preTestMoves: [{ origin: 'c2', destination: 'c4' }],
    testPieceSquare: 'd4',
    expectedMoves: ['d3', 'c3'],
  },
  {
    board: createBoard({
      position: {
        wp: ['e2', 'c2'],
        bp: ['d4', 'h7'],
      },
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
      position: {
        wp: ['e2'],
        bp: ['d4', 'a7'],
      },
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

export interface PromotionBoardAndMoves {
  board: Board;
  postPromotionBoard: Board;
  promotingMove: MoveCoordinate & { promotionPiece: PieceType };
  promotedPieceMoves: Coordinate[];
}

export const promotion: PromotionBoardAndMoves[] = [
  {
    board: createBoard({
      position: {
        wp: ['c7'],
      },
    }),
    postPromotionBoard: createBoard({
      position: {
        wq: ['c8'],
      },
    }),
    promotingMove: { origin: 'c7', destination: 'c8', promotionPiece: 'q' },
    promotedPieceMoves: [
      'c1',
      'c2',
      'h3',
      'c3',
      'g4',
      'c4',
      'f5',
      'c5',
      'a6',
      'e6',
      'c6',
      'c7',
      'b7',
      'd7',
      'b8',
      'a8',
      'd8',
      'e8',
      'f8',
      'g8',
      'h8',
    ],
  },
  {
    board: createBoard({
      position: {
        wp: ['c7'],
      },
    }),
    postPromotionBoard: createBoard({
      position: {
        wr: ['c8'],
      },
    }),
    promotingMove: { origin: 'c7', destination: 'c8', promotionPiece: 'r' },
    promotedPieceMoves: [
      'c1',
      'c2',
      'c3',
      'c4',
      'c5',
      'c6',
      'c7',
      'a8',
      'b8',
      'd8',
      'e8',
      'f8',
      'g8',
      'h8',
    ],
  },
  {
    board: createBoard({
      position: {
        wp: ['c7'],
      },
    }),
    postPromotionBoard: createBoard({
      position: {
        wb: ['c8'],
      },
    }),
    promotingMove: { origin: 'c7', destination: 'c8', promotionPiece: 'b' },
    promotedPieceMoves: ['h3', 'g4', 'f5', 'a6', 'e6', 'b7', 'd7'],
  },
  {
    board: createBoard({
      position: {
        wp: ['c7'],
      },
    }),
    postPromotionBoard: createBoard({
      position: {
        wn: ['c8'],
      },
    }),
    promotingMove: { origin: 'c7', destination: 'c8', promotionPiece: 'n' },
    promotedPieceMoves: ['b6', 'd6', 'a7', 'e7'],
  },
  {
    board: createBoard({
      position: {
        bp: ['c2'],
      },
      state: { turn: 'b' },
    }),
    postPromotionBoard: createBoard({
      position: {
        bq: ['c1'],
      },
      state: { turn: 'b' },
    }),
    promotingMove: { origin: 'c2', destination: 'c1', promotionPiece: 'q' },
    promotedPieceMoves: [
      'b1',
      'a1',
      'd1',
      'e1',
      'f1',
      'g1',
      'h1',
      'b2',
      'd2',
      'c2',
      'a3',
      'e3',
      'c3',
      'f4',
      'c4',
      'g5',
      'c5',
      'h6',
      'c6',
      'c7',
      'c8',
    ],
  },
  {
    board: createBoard({
      position: {
        bp: ['c2'],
      },
      state: { turn: 'b' },
    }),
    postPromotionBoard: createBoard({
      position: {
        br: ['c1'],
      },
      state: { turn: 'b' },
    }),
    promotingMove: { origin: 'c2', destination: 'c1', promotionPiece: 'r' },
    promotedPieceMoves: [
      'b1',
      'a1',
      'd1',
      'e1',
      'f1',
      'g1',
      'h1',
      'c2',
      'c3',
      'c4',
      'c5',
      'c6',
      'c7',
      'c8',
    ],
  },
  {
    board: createBoard({
      position: {
        bp: ['c2'],
      },
      state: { turn: 'b' },
    }),
    postPromotionBoard: createBoard({
      position: {
        bb: ['c1'],
      },
      state: { turn: 'b' },
    }),
    promotingMove: { origin: 'c2', destination: 'c1', promotionPiece: 'b' },
    promotedPieceMoves: ['b2', 'd2', 'a3', 'e3', 'f4', 'g5', 'h6'],
  },
  {
    board: createBoard({
      position: {
        bp: ['c2'],
      },
      state: { turn: 'b' },
    }),
    postPromotionBoard: createBoard({
      position: {
        bn: ['c1'],
      },
      state: { turn: 'b' },
    }),
    promotingMove: { origin: 'c2', destination: 'c1', promotionPiece: 'n' },
    promotedPieceMoves: ['a2', 'e2', 'b3', 'd3'],
  },
];
