import { Board, BoardSquare } from '../../../utils/board/board.types';
import { Piece, PieceColor } from '../../../utils/pieces.types';
import { GameViewHandlers } from '../../Game/GameView.types';

export type FocusedPiece =
  | {
      piece: Piece;
      square: BoardSquare;
    }
  | Record<string, never>;

export interface BoardHandlers {
  setPieceFocus: (piece: Piece, square: BoardSquare) => void;
  removePieceFocus: () => void;
  movePiece: (destination: BoardSquare) => void;
}

export interface BoardData {
  candidateSquares: BoardSquare[];
  focusedPiece: FocusedPiece;
  gameOver: boolean;
  turn: PieceColor;
}

export interface BoardProps {
  initialBoard: Board;
  handlers: GameViewHandlers;
}

export interface BoardUIProps {
  board: Board;
  handlers: BoardHandlers;
  data: BoardData;
}
