import { Board } from './board.types';
import { PIECES } from '../pieces';
const { w, b } = PIECES;

const board: Board = {
  state: {
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
    promotion: { active: false },
    capturedPieces: {
      w: [],
      b: [],
    },
    turn: 'w',
    result: undefined,
  },
  position: [
    null,
    {
      a: w.r,
      b: w.n,
      c: w.b,
      d: w.q,
      e: w.k,
      f: w.b,
      g: w.n,
      h: w.r,
    },
    {
      a: w.p,
      b: w.p,
      c: w.p,
      d: w.p,
      e: w.p,
      f: w.p,
      g: w.p,
      h: w.p,
    },
    {},
    {},
    {},
    {},
    {
      a: b.p,
      b: b.p,
      c: b.p,
      d: b.p,
      e: b.p,
      f: b.p,
      g: b.p,
      h: b.p,
    },
    {
      a: b.r,
      b: b.n,
      c: b.b,
      d: b.q,
      e: b.k,
      f: b.b,
      g: b.n,
      h: b.r,
    },
  ],
};

export default board;
