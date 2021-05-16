import { DevError } from './errors';
import config from '../config/config';

import { BoardLine, BoardPosition, BoardSquare, BoardState } from './board.types';
import { PieceColor } from './pieces.types';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

if (numberFiles > alphabet.length)
  throw new DevError(`Max file size is ${alphabet.length}`);

export const files: BoardLine<string> = Object.assign(alphabet.slice(0, numberFiles).split(''), { first: alphabet[0] as string, last: alphabet[numberFiles - 1] as string });
export const ranks: BoardLine<number> = Object.assign([], { first: 0, last: 0 });

for (let i = numberRanks; i >= 1; i--) ranks.push(i);
ranks.first = ranks[ranks.length - 1] as number;
ranks.last = ranks[0] as number;
export const orderedRanks: BoardLine<number> = [...ranks].reverse() as BoardLine<number>;
Object.freeze(files);
Object.freeze(ranks);
Object.freeze(orderedRanks);

export function matchingSquares(square1: BoardSquare, square2: BoardSquare) {
  return square1.rank === square2.rank && square1.file === square2.file;
}

export function getPieceAtSquare(position: BoardPosition, square: BoardSquare) {
  return position[square.rank][square.file];
}

export function getSquareAtOffset(square: BoardSquare, offsetX: number, offsetY: number) {
  const { file, rank } = square;

  const newFile = alphabet[alphabet.indexOf(file) + offsetX] as string;
  const newRank = rank + offsetY;
  if (!files.includes(newFile))
    throw new Error(`OffsetX too large. File: ${file}, offseetX: ${offsetX}`);
  if (!ranks.includes(newRank))
    throw new Error(`OffsetY too large. Rank: ${rank}, offseetY: ${offsetY}`);

  return { file: newFile, rank: newRank };
}

export function validateSquare(square: BoardSquare) {
  if (typeof square !== 'object' || !square.rank || !square.file)
    throw new DevError('Square must have rank and file properties.');

  const { rank, file } = square;
  if (!ranks.includes(rank)) throw new DevError(`Invalid rank: ${rank}`);
  if (!files.includes(file)) throw new DevError(`Invalid file: ${file}`);
}

export function isCornerSquare(square: BoardSquare) {
  validateSquare(square);
  const { file, rank } = square;
  if (rank > ranks.first && rank < ranks.last) return false;
  if (file > files.first && file < files.last) return false;

  return true;
}

export function getCastlingRank(color: PieceColor) {
  return color === 'w' ? ranks.first : ranks.last;
}

export function getCastlingPosition(color: PieceColor) {
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

export function getKingSquare(boardState: BoardState, color: PieceColor) {
  return boardState.king[color].square;
}

export function getCheckedSide(boardState: BoardState) {
  return boardState.king.checkedSide;
}
