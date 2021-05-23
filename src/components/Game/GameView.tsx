import React from 'react';
import Board from '../Board/Board/Board';
import BoardSidebar, { SidebarSpacer } from '../Board/Sidebar/Sidebar';

interface GameViewProps {
  any?: unknown;
}

const GameView: React.FC<GameViewProps> = () => {
  return (
    <>
      <SidebarSpacer />
      <Board />
      <BoardSidebar />
    </>
  );
};

export default GameView;
