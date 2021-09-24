import {
  Board,
  BoardPromotionState,
  BoardSquare,
} from '../../../utils/board/board.types';
import { Piece, PieceColor, PromotionPiece } from '../../../utils/pieces.types';
import { BoardDirection, GameViewHandlers } from '../../Game/GameView.types';

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
  direction: BoardDirection;
  candidateSquares: BoardSquare[];
  focusedPiece: FocusedPiece;
  gameOver: boolean;
  turn: PieceColor;
  promotion: BoardPromotionState;
  moveOnlyColor?: PieceColor;
  hideHighlights?: boolean;
}

export interface BoardProps {
  initialBoard: Board;
  direction?: BoardDirection;
  moveOnlyColor?: PieceColor;
  handlers: GameViewHandlers;
}

export interface BoardUIProps {
  board: Board;
  handlers: BoardHandlers;
  data: BoardData;
}
