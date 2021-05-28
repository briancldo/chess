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

export type PieceSquarePair = [PieceString, SquareString];
export function createConcisePosition(pieceSquarePairs: PieceSquarePair[]) {
  return produce(EMPTY_POSITION, (draft) => {
    for (const [pieceString, squareString] of pieceSquarePairs) {
      const piece = pieceStringToObject(pieceString);
      const square = squareStringToObject(squareString);

      const { rank, file } = square;
      draft[rank][file] = piece;
    }
  });
}
