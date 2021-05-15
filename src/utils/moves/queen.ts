import bishopMove from './bishop';
import rookMove from './rook';

export default function queenMove(square, color, position) {
  return [
    ...bishopMove(square, color, position),
    ...rookMove(square, color, position),
  ];
}
