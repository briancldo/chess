import { produce } from 'immer';

import { DevError } from './errors';
import config from '../config/config';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

if (numberFiles > alphabet.length)
  throw new DevError(`Max file size is ${alphabet.length}`);

const files = alphabet.slice(0, numberFiles).split('');
const ranks = [];
for (let i = numberRanks; i >= 1; i--) ranks.push(i);
Object.freeze(files);
Object.freeze(ranks);

function matchingSquares(square1, square2) {
  return square1.rank === square2.rank && square1.file === square2.file;
}

function getPieceAtSquare(board, square) {
  return board[square.rank][square.file];
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

function validateSquare(square) {
  if (typeof square !== 'object' || !square.rank || !square.file)
    throw new DevError('Square must have rank and file properties.');

  const { rank, file } = square;
  if (!ranks.includes(rank)) throw new DevError(`Invalid rank: ${rank}`);
  if (!files.includes(file)) throw new DevError(`Invalid file: ${file}`);
}

function movePiece(board, start, end) {
  validateSquare(start);
  validateSquare(end);

  const piece = getPieceAtSquare(board, start);
  if (!piece) throw new DevError(`No piece at start square ${start}`);

  return produce(board, (draft) => {
    draft[end.rank][end.file] = piece;
    draft[start.rank][start.file] = undefined;
  });
}

export {
  files,
  ranks,
  matchingSquares,
  getPieceAtSquare,
  getSquareAtOffset,
  movePiece,
};
