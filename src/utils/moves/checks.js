import { matchingSquares } from '../board';

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
