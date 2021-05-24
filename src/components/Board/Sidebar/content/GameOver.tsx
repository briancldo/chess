import React from 'react';

import Button from '../../../ui/Button';
import './GameOver.css';

const SidebarGameOver: React.FC = () => {
  return (
    <div className='board-sidebar-game-over'>
      <h1>Game Over</h1>
      <Button onClick={() => alert('TODO: new game')}>New Game</Button>
    </div>
  );
};

export default SidebarGameOver;
