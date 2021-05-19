import { Board, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';

export type PieceMoveHandler = (
  square: BoardSquare,
  color: PieceColor,
  board: Board
) => BoardSquare[];

export type CastleSide = 'q' | 'k';
