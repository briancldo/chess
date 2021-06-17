import React from 'react';

import { GameActiveSidebarProps } from '../Sidebar.types';
import './GameActive.css';

const GameActive: React.FC<GameActiveSidebarProps> = (props) => {
  const { board } = props;
  return (
    <div className='board-sidebar-game-active'>
      <p>Board: {JSON.stringify(board.state.capturedPieces, null, 2)}</p>
    </div>
  );
};

export default GameActive;
