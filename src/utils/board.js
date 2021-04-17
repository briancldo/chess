import { DevError } from './errors';
import config from '../config/config';
import { validatePiece } from './pieces';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

if (numberFiles > alphabet.length)
  throw new DevError(`Max file size is ${alphabet.length}`);

const files = alphabet.slice(0, numberFiles).split('');
const ranks = [];
for (let i = numberRanks; i >= 1; i--) ranks.push(i);
Object.freeze(files);
Object.freeze(ranks);

function getStartingPosition() {
  return [
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    [undefined, 'bp'],
    [],
    [],
    [],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
  ];
}

function validateSquareCoordinate(coordinate) {
  if (typeof coordinate !== 'string' || coordinate.length !== 2)
    throw new DevError(`Coordinate must be string of length 2: ${coordinate}`);

  const [file, rank] = coordinate.split('');
  if (!files.includes(file)) throw new DevError(`No such file: ${file}`);
  if (!ranks.includes(Number(rank)))
    throw new DevError(`No such rank: ${rank}`);
}

function getCoordinateParts(coordinate) {
  validateSquareCoordinate(coordinate);
  const [file, rank] = coordinate.split('');
  return { file, rank: Number(rank) };
}

function fileToIndex(file) {
  return alphabet.indexOf(file);
}

function rankToIndex(rank) {
  return Number(rank) - 1;
}

function boardIndiciesToCoordinate(boardIndicies) {
  const { rankIndex, fileIndex } = boardIndicies;

  return {
    rank: ranks[rankIndex],
    file: files[fileIndex],
  };
}

function coordinateToBoardIndicies(coordinate) {
  validateSquareCoordinate(coordinate);

  const [file, rank] = coordinate.split('');
  return {
    fileIndex: fileToIndex(file),
    rankIndex: rankToIndex(Number(rank)),
  };
}

function getPieceAtSquare(board, coordinate) {
  if (!coordinate) return;

  const { rankIndex, fileIndex } = coordinateToBoardIndicies(coordinate);

  const piece = board[rankIndex][fileIndex];
  validatePiece(piece);
  return piece;
}

function getPiecesAtSquares(board, coordinates) {
  return coordinates.map((coordinate) => getPieceAtSquare(board, coordinate));
}

function isCoordinateInBounds(coordinate) {
  try {
    validateSquareCoordinate(coordinate);
  } catch {
    return false;
  }

  const { file, rank } = getCoordinateParts(coordinate);
  if (!files.includes(file)) return false;
  if (!ranks.includes(rank)) return false;
  return true;
}

function addCoordinates(coordinate, x, y) {
  validateSquareCoordinate(coordinate);

  const [file, rank] = coordinate.split('');
  const newFile = alphabet[alphabet.indexOf(file) + x];
  const newRank = Number(rank) + y;
  const newCoordinate = `${newFile}${newRank}`;
  if (!isCoordinateInBounds(newCoordinate)) return;
  return newCoordinate;
}

export {
  files,
  ranks,
  getStartingPosition,
  validateSquareCoordinate,
  getCoordinateParts,
  coordinateToBoardIndicies,
  boardIndiciesToCoordinate,
  getPieceAtSquare,
  getPiecesAtSquares,
  addCoordinates,
};
