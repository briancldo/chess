import { BoardDirection, GameResult } from '../../../utils/board/board.types';
import { GameViewHandlers } from '../../Game/GameView.types';
import { Board } from '../../../utils/board/board.types';
import { MatchGameDetails } from '../../../store/match';

// SidebarTypes temporarily hardcoded
export type SidebarType = 'game-over' | 'game-active';
export interface GameOverSidebarProps {
  type: 'game-over';
  result: GameResult;
  handlers: GameViewHandlers;
}

export interface GameActiveSidebarProps {
  type: 'game-active';
  board: Board;
  direction?: BoardDirection;
  gameDetails?: MatchGameDetails;
}

export type SidebarProps = GameOverSidebarProps | GameActiveSidebarProps;

export interface SidebarSpacerProps {
  active?: boolean;
}

export type SidebarContent = React.FC<SidebarProps>; // | OtherSideOverProps, etc.
export interface SidebarDeterminantContext {
  result?: GameResult;
}
