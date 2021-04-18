import { getPieceAtSquare } from './board';

function getPieceLegalMoves(board, pieceCoordinate) {
  const piece = getPieceAtSquare(board, pieceCoordinate, { object: true });
  return computeCandidateSquares[piece.type](
    pieceCoordinate,
    board,
    piece.color
  );
}

const computeCandidateSquares = {
  p: (coordinate, board, color) => {
    console.log({ coordinate, board, color });
    return [];
  },
};

// function removeImpossibleCandidateSquares() {}

export { getPieceLegalMoves };
