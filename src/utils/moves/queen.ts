import { BoardPosition, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';
import bishopMove from './bishop';
import rookMove from './rook';

const queenMove = (
  square: BoardSquare,
  color: PieceColor,
  position: BoardPosition
) => {
  return [
    ...bishopMove(square, color, position),
    ...rookMove(square, color, position),
  ];
};

export default queenMove;
