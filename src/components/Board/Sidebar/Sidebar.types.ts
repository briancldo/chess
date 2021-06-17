import { GameResult } from '../../../utils/board/board.types';
import { GameViewHandlers } from '../../Game/GameView.types';

// SidebarTypes temporarily hardcoded
export type SidebarType = 'game-over' | 'game-active';
export interface GameOverSidebarProps {
  type: 'game-over';
  result: GameResult;
  handlers: GameViewHandlers;
}

export interface GameActiveSidebarProps {
  type: 'game-active';
  message: string;
}

export type SidebarProps = GameOverSidebarProps | GameActiveSidebarProps;

export interface SidebarSpacerProps {
  active?: boolean;
}

export type SidebarContent = React.FC<SidebarProps>; // | OtherSideOverProps, etc.
export interface SidebarDeterminantContext {
  result?: GameResult;
}
