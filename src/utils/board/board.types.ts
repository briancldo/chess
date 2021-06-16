import { DeepPartial } from '../object.types';
import { Piece, PieceColor } from '../pieces.types';

export type BoardAxis<T> = T[] & { first: T; last: T };

export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export type BoardDirection = 1 | -1;

export interface BoardSquare {
  rank: BoardRank;
  file: BoardFile;
}

export type Coordinate = `${BoardFile}${BoardRank}`;

export enum GameResultValue {
  won = '+',
  drawn = '=',
}
export enum GameResultMethod {
  c = 'c',
  s = 's',
}

export type GameWon = {
  value: GameResultValue.won;
  side: PieceColor;
  method: GameResultMethod.c;
};

export type GameDrawn = {
  value: GameResultValue.drawn;
  method: GameResultMethod.s;
};

export type GameResult = GameWon | GameDrawn;

export type ThreatPiece = { piece: Piece; square: BoardSquare };
export interface BoardKingState {
  w: { square?: { file: BoardFile; rank: BoardRank } };
  b: { square?: { file: BoardFile; rank: BoardRank } };
}
export interface BoardCheckDetails {
  threatPieces: ThreatPiece[];
  threatSquares: BoardSquare[];
}
export interface BoardCheckState {
  side?: PieceColor;
  details: BoardCheckDetails;
}
export type BoardPromotionState =
  | {
      active: false;
    }
  | {
      active: true;
      square: BoardSquare;
      prePromoSquare: BoardSquare;
    };
export interface BoardState {
  enPassantSquare?: BoardSquare;
  castling: {
    w: { k: boolean; side: { q: boolean; k: boolean } };
    b: { k: boolean; side: { q: boolean; k: boolean } };
  };
  king: BoardKingState;
  check: BoardCheckState;
  promotion: BoardPromotionState;
  capturedPieces: {
    w: Piece[];
    b: Piece[];
  };
  turn: PieceColor;
  result?: GameResult;
}
export type BoardSubstate = DeepPartial<BoardState>;

export type BoardFullRank = {
  [file in BoardFile]?: Piece;
};

export type BoardPosition = [
  null,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank,
  BoardFullRank
];

export interface Board {
  state: BoardState;
  position: BoardPosition;
}
