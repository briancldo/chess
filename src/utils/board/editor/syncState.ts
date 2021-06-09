import produce from 'immer';

import initialBoard from '../board.init';
import { coordinateToSquare } from '../board';
import {
  BoardSubstate,
  BoardKingState,
  BoardSquare,
  Coordinate,
} from '../board.types';
import { ConcisePosition } from './boardEditor.types';
import { DevError } from '../../errors';

export function synchronizeKingState(
  position?: ConcisePosition,
  state?: BoardSubstate
): BoardKingState {
  const priorKingState: BoardKingState = produce(
    initialBoard.state.king,
    (draft) => {
      if (state?.king?.w?.square)
        draft.w.square = state.king.w.square as BoardSquare;
      if (state?.king?.b?.square)
        draft.b.square = state.king.b.square as BoardSquare;
    }
  );

  return produce(priorKingState, (draft) => {
    if (!position) return;
    if (Array.isArray(position.wk) && position.wk.length !== 1)
      throw new DevError('Only one white king.');
    if (Array.isArray(position.bk) && position.bk.length !== 1)
      throw new DevError('Only one black king.');

    const whiteKingCoordinate = Array.isArray(position.wk)
      ? position.wk[0]
      : position.wk;
    const blackKingCoordinate = Array.isArray(position.bk)
      ? position.bk[0]
      : position.bk;

    if (position.wk)
      draft.w.square = coordinateToSquare(whiteKingCoordinate as Coordinate);
    if (position.bk)
      draft.b.square = coordinateToSquare(blackKingCoordinate as Coordinate);
  });
}
