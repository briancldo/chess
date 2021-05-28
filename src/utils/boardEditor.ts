import { produce } from 'immer';
import { squareStringToObject } from './board';
import { EMPTY_POSITION } from './board.constants';
import initialBoard from './board.init';
import { Board, SquareString } from './board.types';
import { pieceStringToObject } from './pieces';
import { PieceString } from './pieces.types';

export function createBoard(board: Partial<Board>) {
  return produce(initialBoard, (draft) => {
    if (board.position) draft.position = board.position;
    if (board.state) draft.state = board.state;
  });
}

export type PiecePlacements = {
  [pieceString in PieceString]: SquareString[] | SquareString;
};
export function createConcisePosition(pieceSquarePairs: PiecePlacements) {
  return produce(EMPTY_POSITION, (draft) => {
    for (const pieceString in pieceSquarePairs) {
      const piece = pieceStringToObject(pieceString as PieceString);
      let squareStrings = pieceSquarePairs[pieceString as PieceString];
      if (!Array.isArray(squareStrings)) squareStrings = [squareStrings];

      for (const squareString of squareStrings) {
        const square = squareStringToObject(squareString);

        const { rank, file } = square;
        draft[rank][file] = piece;
      }
    }
  });
}
