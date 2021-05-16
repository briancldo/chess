import { Piece, PieceColor } from "./pieces.types";

export type BoardLine<T> = T[] & { first: T, last: T };

export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export type BoardDirection = 1 | -1;

export interface BoardSquare {
  rank: BoardRank;
  file: BoardFile;
}

export enum GameResultValue { won = '+', drawn = '=' }
export enum GameResultMethod { c = 'c', s = 's' };

export type GameWon = {
  value: GameResultValue.won,
  side: PieceColor,
  method: GameResultMethod.c,
};

export type GameDrawn = {
  value: GameResultValue.drawn,
  method: GameResultMethod.s,
};

export type GameResult = GameWon | GameDrawn; 

export type ThreatPiece = { piece: Piece, square: BoardSquare };
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
      threatPieces: ThreatPiece[],
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
