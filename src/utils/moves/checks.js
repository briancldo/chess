import { produce } from 'immer';
import { matchingSquares } from '../board';
import { isSquareAttacked } from './utils';

export function excludeNonCheckHandlingSquares(candidates, board, piece) {
  const { checkDetails } = board[0].king;
  const checkHandlingSquares = [];
  checkHandlingSquares.push(
    ...excludeNonBlockOrCaptureSquares(candidates, checkDetails, piece),
    ...excludeNonKingMoveSquares(candidates, checkDetails.threatSquares, piece)
  );
  return checkHandlingSquares;
}

function excludeNonBlockOrCaptureSquares(candidates, checkDetails, piece) {
  const { threatPieces, threatSquares } = checkDetails;
  if (piece.type === 'k') return [];
  if (threatPieces.length > 1) return [];

  const allBlockOrCaptureSquares = [threatPieces[0].square, ...threatSquares];
  return candidates.filter((candidate) =>
    allBlockOrCaptureSquares.some((blockOrCaptureSquare) =>
      matchingSquares(blockOrCaptureSquare, candidate)
    )
  );
}

function excludeNonKingMoveSquares(candidates, threatSquares, piece) {
  if (piece.type !== 'k') return [];

  return candidates.filter(
    (candidate) =>
      !threatSquares.some((threatSquare) =>
        matchingSquares(threatSquare, candidate)
      )
  );
}

// -------------------------------------------------------------------

export function excludeCheckingSquares(candidates, board, pieceColor) {
  const boardWithoutKing = produce(board, (draft) => {
    const kingSquare = board[0].king[pieceColor].square;
    draft[kingSquare.rank][kingSquare.file] = undefined;
  });

  return candidates.filter(
    (candidate) => !isSquareAttacked(candidate, boardWithoutKing, pieceColor)
  );
}
