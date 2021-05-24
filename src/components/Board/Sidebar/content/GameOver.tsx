import React from 'react';

import Button from '../../../ui/Button';
import { SidebarGameOverProps } from '../Sidebar.types';
import './GameOver.css';

const SidebarGameOver: React.FC<SidebarGameOverProps> = (props) => {
  const { handlers } = props;

  return (
    <div className='board-sidebar-game-over'>
      <h1>Game Over</h1>
      <Button onClick={handlers.resetBoard}>New Game</Button>
    </div>
  );
};

export default SidebarGameOver;
