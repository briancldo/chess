import { BoardSquare } from '../../utils/board.types';
import { Piece, PieceColor } from '../../utils/pieces.types';
import { BoardHandlers } from './Board.types';

export interface SquareProps {
  light: boolean;
  containingPiece?: Piece;
  square: BoardSquare;
  highlighted: boolean;
  isCurrentlyFocusedPiece: boolean;
  isChecked?: boolean;
  isGameOver: boolean;
  turn: PieceColor;
  handlers: BoardHandlers;
}

export interface SquareUIComponentProps {
  color: string;
  square: BoardSquare;
}

export interface CornerSquareProps {
  square: BoardSquare;
}

export interface SquareHighlightProps {
  highlighted: boolean;
  isCurrentlyFocusedPiece: boolean;
  isChecked?: boolean;
}
