import { useEffect } from 'react';
import { socket } from './instance';

import useMatchStore from '../../store/match';
import { makeMove } from '../../utils/moves/moves';
import { Board, BoardSquare } from '../../utils/board/board.types';
import { PieceColor } from '../../utils/pieces.types';
import {
  BoardHandlers,
  FocusedPiece,
} from '../../components/Board/Board/Board.types';

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

export function emitMove(origin: BoardSquare, destination: BoardSquare) {
  const opponent = useMatchStore.getState().opponent?.username;
  // TODO: use matchId instead
  socket.emit('move', { origin, destination, toUsername: opponent });
}

interface RemoteMovesData {
  moveOnlyColor?: PieceColor;
  handlers: BoardHandlers;
  focusedPiece: FocusedPiece;
  updateBoard: (update: React.SetStateAction<Board>) => void;
}
export function useRemoteMoves({
  moveOnlyColor,
  handlers,
  focusedPiece,
  updateBoard,
}: RemoteMovesData) {
  if (moveOnlyColor) {
    // monkeypatching handlers.movePiece to emit made moves
    const originalMovePiece = handlers.movePiece;
    handlers.movePiece = (destination) => {
      if (focusedPiece?.piece?.color === moveOnlyColor) {
        emitMove(focusedPiece.square, destination);
      }
      originalMovePiece(destination);
    };
  }
  useEffect(() => {
    if (!moveOnlyColor) return;

    function movePiece(origin: BoardSquare, destination: BoardSquare) {
      updateBoard((board) => makeMove(board, origin, destination));
      handlers.removePieceFocus();
    }

    return addMoveListener(movePiece);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
