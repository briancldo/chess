import {
  Board,
  BoardPosition,
  BoardState,
} from '../../../../utils/board/board.types';
import {
  createBoard,
  createFromConcisePosition,
} from '../../../../utils/board/boardEditor';

export default {
  stateModified: {
    enPassantSquare: { file: 'e', rank: 4 },
    castling: {
      w: { k: true, side: { q: true, k: true } },
      b: { k: true, side: { q: true, k: true } },
    },
    king: {
      w: { square: { file: 'e', rank: 1 } },
      b: { square: { file: 'e', rank: 8 } },
    },
    check: {
      side: undefined,
      details: {
        threatPieces: [],
        threatSquares: [],
      },
    },
    turn: 'b',
    result: undefined,
  } as BoardState,
  concisePositions: [
    {},
    { bk: 'b4' },
    {
      wq: 'e2',
      wk: 'f2',
      bq: 'h8',
      bk: 'h7',
    },
    {
      wr: ['a1', 'h1'],
      wn: ['b1', 'g1'],
      wb: ['c1', 'f1'],
      wq: 'd1',
      wk: 'e1',
      wp: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],

      br: ['a8', 'h8'],
      bn: ['b8', 'g8'],
      bb: ['c8', 'f8'],
      bq: 'd8',
      bk: 'e8',
      bp: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    },
  ],
  concisePositionResults: [
    [null, {}, {}, {}, {}, {}, {}, {}, {}],
    [null, {}, {}, {}, { b: { type: 'k', color: 'b' } }, {}, {}, {}, {}],
    [
      null,
      {},
      { e: { type: 'q', color: 'w' }, f: { type: 'k', color: 'w' } },
      {},
      {},
      {},
      {},
      { h: { type: 'k', color: 'b' } },
      { h: { type: 'q', color: 'b' } },
    ],
    [
      null,
      {
        a: { type: 'r', color: 'w' },
        b: { type: 'n', color: 'w' },
        c: { type: 'b', color: 'w' },
        d: { type: 'q', color: 'w' },
        e: { type: 'k', color: 'w' },
        f: { type: 'b', color: 'w' },
        g: { type: 'n', color: 'w' },
        h: { type: 'r', color: 'w' },
      },
      {
        a: { type: 'p', color: 'w' },
        b: { type: 'p', color: 'w' },
        c: { type: 'p', color: 'w' },
        d: { type: 'p', color: 'w' },
        e: { type: 'p', color: 'w' },
        f: { type: 'p', color: 'w' },
        g: { type: 'p', color: 'w' },
        h: { type: 'p', color: 'w' },
      },
      {},
      {},
      {},
      {},
      {
        a: { type: 'p', color: 'b' },
        b: { type: 'p', color: 'b' },
        c: { type: 'p', color: 'b' },
        d: { type: 'p', color: 'b' },
        e: { type: 'p', color: 'b' },
        f: { type: 'p', color: 'b' },
        g: { type: 'p', color: 'b' },
        h: { type: 'p', color: 'b' },
      },
      {
        a: { type: 'r', color: 'b' },
        b: { type: 'n', color: 'b' },
        c: { type: 'b', color: 'b' },
        d: { type: 'q', color: 'b' },
        e: { type: 'k', color: 'b' },
        f: { type: 'b', color: 'b' },
        g: { type: 'n', color: 'b' },
        h: { type: 'r', color: 'b' },
      },
    ],
  ],
  successiveCalls: [
    {
      board: createBoard({
        position: { wn: ['d5'] },
      }),
      resultingPosition: [
        null,
        {},
        {},
        {},
        {},
        { d: { type: 'n', color: 'w' } },
        {},
        {},
        {},
      ],
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'e', rank: 1 } },
          b: { square: { file: 'e', rank: 8 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'w',
        result: undefined,
      },
    },
    {
      board: createBoard({
        position: { bn: ['c4'] },
        state: { turn: 'b' },
      }),
      resultingPosition: [
        null,
        {},
        {},
        {},
        { c: { type: 'n', color: 'b' } },
        {},
        {},
        {},
        {},
      ],
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'e', rank: 1 } },
          b: { square: { file: 'e', rank: 8 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'b',
        result: undefined,
      },
    },
  ] as {
    board: Board;
    resultingPosition: BoardPosition;
    resultingState: BoardState;
  }[],
  kingStateSync: [
    {
      board: createBoard({ position: { bk: 'd4' } }),
      resultingPosition: createFromConcisePosition({ bk: 'd4' }),
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'e', rank: 1 } },
          b: { square: { file: 'd', rank: 4 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'w',
        result: undefined,
      },
    },
    {
      board: createBoard({ position: { wk: 'd4' } }),
      resultingPosition: createFromConcisePosition({ wk: 'd4' }),
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'd', rank: 4 } },
          b: { square: { file: 'e', rank: 8 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'w',
        result: undefined,
      },
    },
    {
      board: createBoard({ position: { wk: 'd4', bk: 'g3' } }),
      resultingPosition: createFromConcisePosition({ wk: 'd4', bk: 'g3' }),
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'd', rank: 4 } },
          b: { square: { file: 'g', rank: 3 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'w',
        result: undefined,
      },
    },
    {
      board: createBoard({
        position: { wk: 'd4', bk: 'g3' },
        state: { turn: 'b' },
      }),
      resultingPosition: createFromConcisePosition({ wk: 'd4', bk: 'g3' }),
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'd', rank: 4 } },
          b: { square: { file: 'g', rank: 3 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'b',
        result: undefined,
      },
    },
    {
      board: createBoard({
        position: { wk: 'd4', bk: 'g3' },
        state: { king: { w: { square: { rank: 1, file: 'h' } } }, turn: 'b' },
      }),
      resultingPosition: createFromConcisePosition({ wk: 'd4', bk: 'g3' }),
      resultingState: {
        enPassantSquare: undefined,
        castling: {
          w: { k: true, side: { q: true, k: true } },
          b: { k: true, side: { q: true, k: true } },
        },
        king: {
          w: { square: { file: 'd', rank: 4 } },
          b: { square: { file: 'g', rank: 3 } },
        },
        check: {
          side: undefined,
          details: {
            threatPieces: [],
            threatSquares: [],
          },
        },
        turn: 'b',
        result: undefined,
      },
    },
  ] as {
    board: Board;
    resultingPosition: BoardPosition;
    resultingState: BoardState;
  }[],
};
