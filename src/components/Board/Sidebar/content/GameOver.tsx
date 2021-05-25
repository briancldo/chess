import React from 'react';
import { createGameOverMessage } from '../../../../utils/game';

import Button from '../../../ui/Button';
import { SidebarContentProps } from '../Sidebar.types';
import './GameOver.css';

const SidebarGameOver: React.FC<SidebarContentProps> = (props) => {
  const { context, handlers } = props;
  if (!context.result) return null;
  const { result } = context;

  return (
    <div className='board-sidebar-game-over'>
      <h3>{createGameOverMessage(result)}</h3>
      <Button onClick={handlers.handleNewGame}>New Game</Button>
    </div>
  );
};

export default SidebarGameOver;
