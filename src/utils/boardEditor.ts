import { produce } from 'immer';
import initialBoard from './board.init';
import { Board } from './board.types';

export function createBoard(board: Partial<Board>) {
  return produce(initialBoard, (draft) => {
    if (board.position) draft.position = board.position;
    if (board.state) draft.state = board.state;
  });
}
