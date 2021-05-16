import { BoardPosition, BoardSquare } from "../board.types";
import { PieceColor } from "../pieces.types";

export type PieceMoveHandler = (square: BoardSquare, color?: PieceColor, position?: BoardPosition) => BoardSquare[]