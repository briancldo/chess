import React, { useState } from 'react';
import { BoardSquare } from '../../../utils/board/board.types';
import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';

import { BoardUI } from './Board';
import { BoardData, BoardHandlers } from './Board.types';

interface EditableBoardProps {
  any?: never;
}

const board = createBoard({ position: createFromConcisePosition({}) });
const dummyHandler = () => undefined;
const EditableBoard: React.FC<EditableBoardProps> = () => {
  const [candidateSquares] = useState<BoardSquare[]>([]);

  const handlers: BoardHandlers = {
    setPieceFocus: dummyHandler,
    removePieceFocus: dummyHandler,
    movePiece: dummyHandler,
  };
  const data: BoardData = {
    candidateSquares,
    focusedPiece: {},
    gameOver: false,
    turn: 'w',
  };

  return <BoardUI board={board} handlers={handlers} data={data} />;
};

export default EditableBoard;
