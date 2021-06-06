import { Board, GameResult } from '../../utils/board/board.types';

export interface GameViewProps {
  initialBoard?: Board;
}

export type GameOverHandler = (result: GameResult) => void;
export interface GameViewHandlers {
  handleNewGame: () => void;
  handleGameOver: GameOverHandler;
}
