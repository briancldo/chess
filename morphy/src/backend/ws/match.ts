import { BoardSquare } from '../../utils/board/board.types';
import { socket } from './instance';

interface MoveEventData {
  origin: BoardSquare;
  destination: BoardSquare;
}
export function addMoveListener(
  movePiece: (origin: BoardSquare, destination: BoardSquare) => void
) {
  socket.on('move', ({ origin, destination }: MoveEventData) => {
    movePiece(origin, destination);
  });

  return () => {
    socket.off('move');
  };
}
