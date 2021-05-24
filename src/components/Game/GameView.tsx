import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Board from '../Board/Board/Board';
import BoardSidebar, { SidebarSpacer } from '../Board/Sidebar/Sidebar';

interface GameViewProps {
  any?: unknown;
}

const GameView: React.FC<GameViewProps> = () => {
  const [boardId, setBoardId] = useState(uuidv4());

  function resetBoard() {
    setBoardId(uuidv4());
  }

  const handlers = useMemo(
    () => ({
      resetBoard,
    }),
    []
  );

  return (
    <>
      <SidebarSpacer />
      <Board key={boardId} />
      <BoardSidebar handlers={handlers} />
    </>
  );
};

export default GameView;
