import React from 'react';
import Board from '../Board/Board/Board';
import BoardSidebar from '../Board/Sidebar/Sidebar';

interface GameViewProps {
  any?: unknown;
}

const GameView: React.FC<GameViewProps> = () => {
  return (
    <>
      <Board />
      <BoardSidebar />
    </>
  );
};

export default GameView;
