import { Board, BoardSquare } from "../../utils/board.types";
import { Piece } from "../../utils/pieces.types";

export type FocusedPiece = {
  piece: Piece;
  square: BoardSquare;
} | {};

export interface BoardHandlers {
  setPieceFocus: (piece: Piece, square: BoardSquare) => void;
  removePieceFocus: () => void;
  movePiece: (destination: BoardSquare) => void;
}

export interface BoardData {
  candidateSquares: BoardSquare[];
  focusedPiece: FocusedPiece;
  gameOver: boolean;
}

export interface BoardUIProps {
  board: Board;
  handlers: any;
  data: any;
}
