import { BoardSquare } from '../../../utils/board/board.types';
import { Piece, PieceColor } from '../../../utils/pieces.types';
import { BoardHandlers } from '../Board/Board.types';

export interface SquareProps {
  light: boolean;
  containingPiece?: Piece;
  square: BoardSquare;
  hideHighlights?: boolean;
  highlighted: boolean;
  isCurrentlyFocusedPiece: boolean;
  isChecked?: boolean;
  isGameOver: boolean;
  turn: PieceColor;
  handlers: BoardHandlers;
}

export interface SquareUIProps {
  color: string;
  square?: BoardSquare;
  hideHighlights?: boolean;
  highlighted?: boolean;
  isCurrentlyFocusedPiece: boolean;
  isChecked?: boolean;
  squareShade?: 'light' | 'dark';
  containingPiece?: Piece;
  className?: string;
}

export interface LiteralSquareProps {
  color: string;
  square?: BoardSquare;
}

export interface CornerSquareProps {
  square: BoardSquare;
}

export interface SquareHighlightProps {
  highlighted?: boolean;
  isCurrentlyFocusedPiece: boolean;
  isChecked?: boolean;
}
