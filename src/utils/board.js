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
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [],
    [],
    [],
    [],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ];
}

function validateSquareCoordinate(coordinate) {
  if (typeof coordinate !== 'string' || coordinate.length !== 2)
    throw new DevError('Coordinate must be string of length 2.');

  const [file, rank] = coordinate.split('');
  if (!files.includes(file)) throw new DevError(`No such file: ${file}`);
  if (!ranks.includes(rank)) throw new DevError(`No such rank: ${rank}`);
}

function fileToIndex(file) {
  return alphabet.indexOf(file);
}

function rankToIndex(rank) {
  return rank - 1;
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
    rankIndex: rankToIndex(rank),
  };
}

function getPieceAtSquare(coordinate) {
  const { rankIndex, fileIndex } = coordinateToBoardIndicies(coordinate);

  const piece = coordinate[rankIndex][fileIndex];
  validatePiece(piece);
  return piece;
}

function addCoordinates(coordinate, x, y) {
  validateSquareCoordinate(coordinate);

  const [file, rank] = coordinate.split('');
  const newFile = alphabet[alphabet.indexOf(file) + x];
  const newRank = rank + y;

  return `${newFile}${newRank}`;
}

export {
  files,
  ranks,
  getStartingPosition,
  validateSquareCoordinate,
  coordinateToBoardIndicies,
  boardIndiciesToCoordinate,
  getPieceAtSquare,
  addCoordinates,
};
