import { Draft, produce } from 'immer';

import { DevError } from '../../errors';
import { isPromotionPiece } from '../../pieces';
import { Board } from '../board.types';
import { coordinateToSquare } from '../square/square';
import { CreateBoardOptions } from './boardEditor.types';

export function applyPostProcessing(
  board: Board,
  options?: CreateBoardOptions
): Board {
  return produce(board, (draft) => {
    handlePromotionSquares(draft, options);
  });
}

function handlePromotionSquares(
  draft: Draft<Board>,
  options?: CreateBoardOptions
) {
  if (options?.squaresPromotedPieces) {
    for (const coordinate of options.squaresPromotedPieces) {
      const { rank, file } = coordinateToSquare(coordinate);
      const piece = draft.position[rank][file];
      if (!piece) throw new DevError(`No piece at ${coordinate}`);
      if (!isPromotionPiece(piece))
        throw new DevError(`Piece at ${coordinate} not promotion piece.`);
      draft.position[rank][file] = { ...piece, promoted: true };
    }
  }
}
