import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Board from '../Board/Board/Board';
import initialBoardClassic from '../../utils/board/board.init';
import BoardSidebar, { SidebarSpacer } from '../Board/Sidebar/Sidebar';
import {
  GameViewProps,
  GameViewHandlers,
  GameOverHandler,
  BoardDirection,
} from './GameView.types';
import { Board as BoardType, GameResult } from '../../utils/board/board.types';
import { MatchGameDetails } from '../../store/match';

const GameView: React.FC<GameViewProps> = (props) => {
  const { direction, gameDetails } = props;
  const [boardId, setBoardId] = useState(uuidv4());
  const [result, setResult] = useState<GameResult>();
  const [initialBoard, setInitialBoard] = useState(
    props.initialBoard ?? initialBoardClassic
  );
  const [boardMirror, setBoardMirror] = useState(initialBoard);

  function handleNewGame() {
    setResult(undefined);
    setInitialBoard(initialBoardClassic);
    setBoardMirror(initialBoardClassic);
    setBoardId(uuidv4());
  }

  const handleGameOver: GameOverHandler = (result) => {
    setResult(result);
  };

  const handlers = useMemo<GameViewHandlers>(
    () => ({
      handleNewGame,
      handleGameOver,
      setBoardMirror,
    }),
    []
  );

  const RenderedSidebar = getSidebarByContext(
    { result },
    { handlers, board: boardMirror, direction, gameDetails }
  );
  return (
    <>
      <SidebarSpacer active />
      <Board
        key={boardId}
        initialBoard={initialBoard}
        direction={direction}
        handlers={handlers}
      />
      {RenderedSidebar}
    </>
  );
};

export default GameView;

interface SidebarContext {
  result?: GameResult;
}
interface SomeSidebarProps {
  board: BoardType;
  direction?: BoardDirection;
  gameDetails?: MatchGameDetails;
  handlers: GameViewHandlers;
}
function getSidebarByContext(
  context: SidebarContext,
  someProps: SomeSidebarProps
): JSX.Element {
  const { result } = context;
  const { board, direction, gameDetails, handlers } = someProps;
  if (result)
    return <BoardSidebar type='game-over' {...{ result, handlers }} />;
  return (
    <BoardSidebar type='game-active' {...{ board, direction, gameDetails }} />
  );
}
