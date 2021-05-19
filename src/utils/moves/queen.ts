import { Board, BoardSquare } from '../board.types';
import { PieceColor } from '../pieces.types';
import bishopMove from './bishop';
import rookMove from './rook';

const queenMove = (square: BoardSquare, color: PieceColor, board: Board) => {
  return [
    ...bishopMove(square, color, board),
    ...rookMove(square, color, board),
  ];
};

export default queenMove;
