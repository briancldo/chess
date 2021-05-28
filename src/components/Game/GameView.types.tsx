import { GameResult } from '../../utils/board/board.types';

export interface GameViewProps {
  any?: unknown;
}

export type GameOverHandler = (result: GameResult) => void;
export interface GameViewHandlers {
  handleNewGame: () => void;
  handleGameOver: GameOverHandler;
}
