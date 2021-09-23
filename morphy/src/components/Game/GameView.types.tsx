import { Board, GameResult } from '../../utils/board/board.types';

export type BoardDirection = 1 | -1;
export interface GameViewProps {
  initialBoard?: Board;
  direction?: BoardDirection;
}

export type GameOverHandler = (result: GameResult) => void;
export interface GameViewHandlers {
  handleNewGame: () => void;
  handleGameOver: GameOverHandler;
  setBoardMirror: React.Dispatch<React.SetStateAction<Board>>;
}
