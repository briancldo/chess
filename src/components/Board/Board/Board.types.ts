import {
  Board,
  BoardPromotionState,
  BoardSquare,
} from '../../../utils/board/board.types';
import { Piece, PieceColor, PromotionPiece } from '../../../utils/pieces.types';
import { GameViewHandlers } from '../../Game/GameView.types';

export type FocusedPiece =
  | {
      piece: Piece;
      square: BoardSquare;
    }
  | Record<string, never>;

export type SelectPromotionPiece = (piece: PromotionPiece) => void;
export interface BoardHandlers {
  setPieceFocus: (piece: Piece, square: BoardSquare) => void;
  removePieceFocus: () => void;
  movePiece: (destination: BoardSquare) => void;
  selectPromotionPiece: SelectPromotionPiece;
}

export interface BoardData {
  candidateSquares: BoardSquare[];
  focusedPiece: FocusedPiece;
  gameOver: boolean;
  turn: PieceColor;
  promotion: BoardPromotionState;
  hideHighlights?: boolean;
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
