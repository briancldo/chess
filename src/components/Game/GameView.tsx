import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameResult } from '../../utils/board/board.types';

import Board from '../Board/Board/Board';
import initialBoard from '../../utils/board/board.init';
import BoardSidebar, { SidebarSpacer } from '../Board/Sidebar/Sidebar';
import {
  GameViewProps,
  GameViewHandlers,
  GameOverHandler,
} from './GameView.types';

const GameView: React.FC<GameViewProps> = () => {
  const [boardId, setBoardId] = useState(uuidv4());
  const [result, setResult] = useState<GameResult>();

  function handleNewGame() {
    setResult(undefined);
    setBoardId(uuidv4());
  }

  const handleGameOver: GameOverHandler = (result) => {
    setResult(result);
  };

  const handlers = useMemo<GameViewHandlers>(
    () => ({
      handleNewGame,
      handleGameOver,
    }),
    []
  );

  return (
    <>
      <SidebarSpacer result={result} />
      <Board key={boardId} initialBoard={initialBoard} handlers={handlers} />
      <BoardSidebar handlers={handlers} result={result} />
    </>
  );
};

export default GameView;
