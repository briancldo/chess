import { Board } from '../../utils/board/board.types';

export const routeMapping = {
  game: '/',
  match: '/match',
  editor: '/editor',
};

export type RouteName = keyof typeof routeMapping;

export interface GameLocationState {
  board: Board;
}
