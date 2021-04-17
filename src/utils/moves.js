import { getPieceAtSquare, addCoordinates } from './board';

function getPieceLegalMoves(board, pieceCoordinate) {
  const [pieceColor, pieceType] = getPieceAtSquare(pieceCoordinate);
  return computeCandidateSquares[pieceType](pieceCoordinate, board, pieceColor);
}

const computeCandidateSquares = {
  p: (coordinate, board, color) => {
    const [, rank] = coordinate.split('');
    const candidateSquares = [];

    candidateSquares.push(addCoordinates(coordinate, 0, 1));

    const startingRank = color === 'w' ? 2 : 7;
    rank === startingRank &&
      candidateSquares.push(addCoordinates(coordinate, 0, 2));
  },
};

// function removeImpossibleCandidateSquares() {}

export { getPieceLegalMoves };
