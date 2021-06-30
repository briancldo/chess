import { BoardFile, BoardRank, BoardSquare, Coordinate } from '../board.types';

export function matchingSquares(square1: BoardSquare, square2: BoardSquare) {
  return square1.rank === square2.rank && square1.file === square2.file;
}

export function coordinateToSquare(coordinate: Coordinate): BoardSquare {
  const [file, rank] = coordinate.split('');
  return {
    rank: Number.parseInt(rank as string) as BoardRank,
    file: file as BoardFile,
  };
}

export function squareToCoordinate(square: BoardSquare): Coordinate {
  return `${square.file}${square.rank}` as Coordinate;
}
