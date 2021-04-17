import { getPieceAtSquare, addCoordinates } from './board';

function getPieceLegalMoves(board, pieceCoordinate) {
  const [pieceColor, pieceType] = getPieceAtSquare(
    board,
    pieceCoordinate
  ).split('');
  return computeCandidateSquares[pieceType](pieceCoordinate, board, pieceColor);
}

const computeCandidateSquares = {
  p: (coordinate, board, color) => {
    const [, rank] = coordinate.split('');
    const candidateSquares = [];

    candidateSquares.push(addCoordinates(coordinate, 0, 1));

    const startingRank = color === 'w' ? '2' : '7';
    console.log({ color, rank, startingRank });
    rank === startingRank &&
      candidateSquares.push(addCoordinates(coordinate, 0, 2));

    return candidateSquares;
  },
};

// function removeImpossibleCandidateSquares() {}

export { getPieceLegalMoves };
