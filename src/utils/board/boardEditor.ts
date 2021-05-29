import { produce } from 'immer';
import assign from 'lodash/assign';
import { coordinateToSquare } from './board';
import { EMPTY_POSITION } from './board.constants';
import initialBoard from './board.init';
import { BoardPosition, BoardSubstate, Coordinate } from './board.types';
import { pieceStringToObject } from '../pieces';
import { PieceString } from '../pieces.types';

export function createBoard(board: {
  position?: BoardPosition;
  state?: BoardSubstate;
}) {
  const { position, state } = board;
  return {
    position: position ?? initialBoard.position,
    state: state ? assign(initialBoard.state, state) : initialBoard.state,
  };
}

export type PiecePlacements = {
  [pieceString in PieceString]?: Coordinate[] | Coordinate;
};
export function createConcisePosition(pieceSquarePairs: PiecePlacements) {
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
