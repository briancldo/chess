import { produce } from 'immer';
import assign from 'lodash/assign';
import { ranks } from '../board';
import { squareToCoordinate, coordinateToSquare } from '../square/square';
import { EMPTY_POSITION } from '../board.constants';
import initialBoard from '../board.init';
import {
  BoardFile,
  BoardPosition,
  BoardRank,
  BoardSubstate,
  Coordinate,
} from '../board.types';
import { pieceObjectToString, pieceStringToObject } from '../../pieces';
import { PieceString } from '../../pieces.types';
import { ConcisePosition } from './boardEditor.types';
import { synchronizeCheckState, synchronizeKingState } from './syncState';

export function createBoard(board: {
  position?: ConcisePosition;
  state?: BoardSubstate;
}) {
  const { position, state } = board;
  const syncedState = synchronizeState(position, state);
  return {
    position: position
      ? createFromConcisePosition(position)
      : initialBoard.position,
    state: syncedState,
  };
}

function synchronizeState(position?: ConcisePosition, state?: BoardSubstate) {
  const kingState = synchronizeKingState(position, state);
  const { checkState, turnState } = synchronizeCheckState(
    assign({}, state, { king: kingState }),
    position
  );
  const syncedState = state
    ? assign({}, initialBoard.state, state)
    : initialBoard.state;
  return assign(
    {},
    syncedState,
    { king: kingState },
    { check: checkState },
    { turn: turnState }
  );
}

export function createFromConcisePosition(concisePosition: ConcisePosition) {
  return produce(EMPTY_POSITION, (draft) => {
    for (const pieceString in concisePosition) {
      const piece = pieceStringToObject(pieceString as PieceString);
      let coordinates = concisePosition[pieceString as PieceString];
      if (!coordinates) continue;
      if (!Array.isArray(coordinates)) coordinates = [coordinates];

      for (const coordinate of coordinates) {
        const square = coordinateToSquare(coordinate);

        const { rank, file } = square;
        draft[rank][file] = piece;
      }
    }
  });
}

export function createConciseFromPosition(position: BoardPosition) {
  const concisePosition: ConcisePosition = {};

  for (let rank = 1; rank <= ranks.length; rank++) {
    const fullRank = position[rank];
    for (const file in fullRank) {
      const piece = fullRank[file as BoardFile];
      if (!piece) continue;

      const pieceString = pieceObjectToString(piece);
      const coordinate = squareToCoordinate({
        rank: rank as BoardRank,
        file: file as BoardFile,
      });
      concisePosition[pieceString] = [
        ...((concisePosition[pieceString] as Coordinate[]) ?? []),
        coordinate,
      ];
    }
  }

  return concisePosition;
}
