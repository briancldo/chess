import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameResult } from '../../utils/board/board.types';

import Board from '../Board/Board/Board';
import initialBoardClassic from '../../utils/board/board.init';
import BoardSidebar, { SidebarSpacer } from '../Board/Sidebar/Sidebar';
import {
  GameViewProps,
  GameViewHandlers,
  GameOverHandler,
} from './GameView.types';
import { useLocation } from 'react-router';

const GameView: React.FC<GameViewProps> = (props) => {
  console.log({ location: useLocation() });
  const [boardId, setBoardId] = useState(uuidv4());
  const [result, setResult] = useState<GameResult>();
  const initialBoard = props.initialBoard ?? initialBoardClassic;

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
