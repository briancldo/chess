import { Piece, PieceColor } from "./pieces.types";

export type BoardLine<T> = T[] & { first: T, last: T };

export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface BoardSquare {
  rank: BoardRank;
  file: BoardFile;
}

type GameResult = {
  value: '+',
  side: PieceColor,
  method: 'c',
} | {
  value: '=',
  method: 's',
}

export interface BoardState {
  enPassantSquare?: BoardSquare,
  castling: {
    w: { k: boolean, side: { q: boolean, k: boolean } },
    b: { k: boolean, side: { q: boolean, k: boolean } },
  },
  king: {
    w: { square: { file: BoardFile, rank: BoardRank } },
    b: { square: { file: BoardFile, rank: BoardRank } },
    checkedSide?: PieceColor,
    checkDetails: {
      threatPieces: Piece[],
      threatSquares: BoardSquare[],
    },
  },
  result: GameResult | {}
}

type BoardFullRank = {
  [file in BoardFile]?: Piece
}

export type BoardPosition = [
  undefined,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
]

export interface Board {
  state: BoardState;
  position: BoardPosition;
}
