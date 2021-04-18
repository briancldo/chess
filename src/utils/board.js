import cloneDeep from 'lodash/cloneDeep';
import { DevError } from './errors';
import config from '../config/config';
import initialBoardPosition from './board.init';
import { pieceStringToObject } from './pieces';

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
  return cloneDeep(initialBoardPosition);
}

function matchingSquares(square1, square2) {
  return square1.rank === square2.rank && square1.file === square2.file;
}

function getPieceAtSquare(board, square, options = {}) {
  const { rank, file } = square;

  const piece = board[rank][file];
  if (!piece) return;
  if (options.object) return pieceStringToObject(piece);
  return piece;
}

function getSquareAtOffset(square, offsetX, offsetY) {
  const { file, rank } = square;

  const newFile = alphabet[alphabet.indexOf(file) + offsetX];
  const newRank = rank + offsetY;
  if (!files.includes(newFile))
    throw new Error(`OffsetX too large. File: ${file}, offseetX: ${offsetX}`);
  if (!ranks.includes(newRank))
    throw new Error(`OffsetY too large. Rank: ${rank}, offseetY: ${offsetY}`);

  return { file: newFile, rank: newRank };
}

export {
  files,
  ranks,
  getStartingPosition,
  matchingSquares,
  getPieceAtSquare,
  getSquareAtOffset,
};
