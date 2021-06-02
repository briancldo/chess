import { produce } from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';
import { coordinateToSquare, ranks, squareToCoordinate } from './board';
import { EMPTY_POSITION } from './board.constants';
import initialBoard from './board.init';
import {
  BoardFile,
  BoardPosition,
  BoardRank,
  BoardSubstate,
  Coordinate,
} from './board.types';
import { pieceObjectToString, pieceStringToObject } from '../pieces';
import { PieceString } from '../pieces.types';

export function createBoard(board: {
  position?: BoardPosition;
  state?: BoardSubstate;
}) {
  const { position, state } = board;
  return {
    position: position ?? initialBoard.position,
    state: state
      ? assign(cloneDeep(initialBoard.state), state)
      : initialBoard.state,
  };
}

export type PiecePlacements = {
  [pieceString in PieceString]?: Coordinate[] | Coordinate;
};
export function createFromConcisePosition(pieceSquarePairs: PiecePlacements) {
  return produce(EMPTY_POSITION, (draft) => {
    for (const pieceString in pieceSquarePairs) {
      const piece = pieceStringToObject(pieceString as PieceString);
      let coordinates = pieceSquarePairs[pieceString as PieceString];
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
  const concisePosition: PiecePlacements = {};

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
