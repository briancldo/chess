import {
  getPieceAtSquare,
  getCoordinateParts,
  addCoordinates,
  getPiecesAtSquares,
} from './board';

function getPieceLegalMoves(board, pieceCoordinate) {
  const [pieceColor, pieceType] = getPieceAtSquare(
    board,
    pieceCoordinate
  ).split('');
  return computeCandidateSquares[pieceType](pieceCoordinate, board, pieceColor);
}

const computeCandidateSquares = {
  p: (coordinate, board, color) => {
    const { rank } = getCoordinateParts(coordinate);
    const candidates = [];

    candidates.push(addCoordinates(coordinate, 0, 1));

    const startingRank = color === 'w' ? 2 : 7;
    rank === startingRank && candidates.push(addCoordinates(coordinate, 0, 2));

    const [leftDiagonalCoordinate, rightDiagonalCoordinate] = [
      addCoordinates(coordinate, -1, 1),
      addCoordinates(coordinate, 1, 1),
    ];
    const [pieceLeftDiagonal, pieceRightDiagonal] = getPiecesAtSquares(board, [
      leftDiagonalCoordinate,
      rightDiagonalCoordinate,
    ]);
    if (pieceLeftDiagonal && pieceLeftDiagonal[0] !== color)
      candidates.push(leftDiagonalCoordinate);
    if (pieceRightDiagonal && pieceRightDiagonal[0] !== color) {
      candidates.push(rightDiagonalCoordinate);
    }

    return candidates;
  },
};

// function removeImpossibleCandidateSquares() {}

export { getPieceLegalMoves };
