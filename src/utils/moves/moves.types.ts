import { BoardPosition, BoardSquare, BoardState } from "../board.types";
import { PieceColor } from "../pieces.types";

export type PieceMoveHandler = (square: BoardSquare, color?: PieceColor, position?: BoardPosition, boardState?: BoardState) => BoardSquare[]

export type CastleSide = 'q' | 'k';
