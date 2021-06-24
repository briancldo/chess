import React from 'react';
import { createGameOverMessage } from '../../../../utils/game';

import Button from '../../../ui/Button';
import { GameOverSidebarProps } from '../Sidebar.types';
import './GameOver.css';

const SidebarGameOver: React.FC<GameOverSidebarProps> = (props) => {
  const { result, handlers } = props;
  if (!result) return null;

  return (
    <div className='board-sidebar-game-over'>
      <h3>{createGameOverMessage(result)}</h3>
      <Button onClick={handlers.handleNewGame}>New Game</Button>
    </div>
  );
};

export default SidebarGameOver;
