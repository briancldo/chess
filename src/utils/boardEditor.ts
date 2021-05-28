import { produce } from 'immer';
import { EMPTY_POSITION } from './board.constants';
import initialBoard from './board.init';
import { Board, BoardSquare } from './board.types';
import { Piece } from './pieces.types';

export function createBoard(board: Partial<Board>) {
  return produce(initialBoard, (draft) => {
    if (board.position) draft.position = board.position;
    if (board.state) draft.state = board.state;
  });
}

interface PieceSquarePair {
  piece: Piece;
  square: BoardSquare;
}

export function createConcisePosition(pieceSquarePairs: PieceSquarePair[]) {
  return produce(EMPTY_POSITION, (draft) => {
    for (const { piece, square } of pieceSquarePairs) {
      const { rank, file } = square;
      draft[rank][file] = piece;
    }
  });
}
