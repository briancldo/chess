import React from 'react';

import { GameActiveSidebarProps } from '../Sidebar.types';
import './GameActive.css';

const GameActive: React.FC<GameActiveSidebarProps> = (props) => {
  const { message } = props;
  return (
    <div className='board-sidebar-game-active'>
      <p>Message: {message}</p>
    </div>
  );
};

export default GameActive;
