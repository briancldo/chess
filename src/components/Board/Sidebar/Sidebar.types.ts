import { GameResult } from '../../../utils/board.types';
import { GameViewHandlers } from '../../Game/GameView.types';

export interface SidebarProps {
  handlers: GameViewHandlers;
  result?: GameResult;
}

export interface SidebarContentProps {
  handlers: GameViewHandlers;
  context: SidebarDeterminantContext;
}

export type SidebarType = React.FC<SidebarContentProps>; // | OtherSideOverProps, etc.
export interface SidebarDeterminantContext {
  result?: GameResult;
}
