import bishopMove from './bishop';
import rookMove from './rook';

export default function queenMove(square, board, color) {
  return [
    ...bishopMove(square, board, color),
    ...rookMove(square, board, color),
  ];
}
