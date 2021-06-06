import { Board } from '../../utils/board/board.types';

export const routeMapping = {
  game: '/',
  editor: '/editor',
};

export type RouteName = keyof typeof routeMapping;

export interface GameLocationState {
  board: Board;
}
