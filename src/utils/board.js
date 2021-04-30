import { DevError } from './errors';
import config from '../config/config';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

if (numberFiles > alphabet.length)
  throw new DevError(`Max file size is ${alphabet.length}`);

export const files = alphabet.slice(0, numberFiles).split('');
export const ranks = [];

files.first = files[0];
files.last = files[files.length - 1];
for (let i = numberRanks; i >= 1; i--) ranks.push(i);
ranks.first = ranks[ranks.length - 1];
ranks.last = ranks[0];
Object.freeze(files);
Object.freeze(ranks);

export function matchingSquares(square1, square2) {
  return square1.rank === square2.rank && square1.file === square2.file;
}

export function getPieceAtSquare(board, square) {
  return board[square.rank][square.file];
}

export function getSquareAtOffset(square, offsetX, offsetY) {
  const { file, rank } = square;

  const newFile = alphabet[alphabet.indexOf(file) + offsetX];
  const newRank = rank + offsetY;
  if (!files.includes(newFile))
    throw new Error(`OffsetX too large. File: ${file}, offseetX: ${offsetX}`);
  if (!ranks.includes(newRank))
    throw new Error(`OffsetY too large. Rank: ${rank}, offseetY: ${offsetY}`);

  return { file: newFile, rank: newRank };
}

export function validateSquare(square) {
  if (typeof square !== 'object' || !square.rank || !square.file)
    throw new DevError('Square must have rank and file properties.');

  const { rank, file } = square;
  if (!ranks.includes(rank)) throw new DevError(`Invalid rank: ${rank}`);
  if (!files.includes(file)) throw new DevError(`Invalid file: ${file}`);
}

export function isCornerSquare(square) {
  validateSquare(square);
  const { file, rank } = square;
  if (rank > ranks.first && rank < ranks.last) return false;
  if (file > files.first && file < files.last) return false;

  return true;
}

export function getCastlingRank(color) {
  return color === 'w' ? ranks.first : ranks.last;
}

export function getCastlingPosition(color) {
  const castlingRank = getCastlingRank(color);
  return {
    q: {
      k: { rank: castlingRank, file: 'c' },
      r: { rank: castlingRank, file: 'd' },
      rFormer: { rank: castlingRank, file: 'a' },
    },
    k: {
      k: { rank: castlingRank, file: 'g' },
      r: { rank: castlingRank, file: 'f' },
      rFormer: { rank: castlingRank, file: 'h' },
    },
  };
}

export function getKingSquare(board, color) {
  return board[0].king[color].square;
}

export function getCheckedSide(board) {
  return board[0].king.checkedSide;
}
