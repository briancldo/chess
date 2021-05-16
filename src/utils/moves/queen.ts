import bishopMove from './bishop';
import { PieceMoveHandler } from './moves.types';
import rookMove from './rook';

const queenMove: PieceMoveHandler = (square, color, position) => {
  return [
    ...bishopMove(square, color, position),
    ...rookMove(square, color, position),
  ];
}

export default queenMove;
