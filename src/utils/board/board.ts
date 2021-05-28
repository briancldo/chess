import { DevError } from '../errors';
import config from '../../config/config';

import {
  BoardFile,
  BoardAxis,
  BoardPosition,
  BoardRank,
  BoardSquare,
  BoardState,
  SquareString,
} from './board.types';
import { PieceColor } from '../pieces.types';
import { CastleSide } from '../moves/moves.types';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

if (numberFiles > alphabet.length)
  throw new DevError(`Max file size is ${alphabet.length}`);

export const files: BoardAxis<BoardFile> = Object.assign(
  alphabet.slice(0, numberFiles).split('') as BoardFile[],
  {
    first: alphabet[0] as BoardFile,
    last: alphabet[numberFiles - 1] as BoardFile,
  }
);
export const ranks: BoardAxis<BoardRank> = Object.assign([] as BoardRank[], {
  first: 0 as BoardRank,
  last: 0 as BoardRank,
});

for (let i = numberRanks; i >= 1; i--) ranks.push(i);
ranks.first = ranks[ranks.length - 1] as BoardRank;
ranks.last = ranks[0] as BoardRank;
export const orderedRanks: BoardAxis<BoardRank> = [
  ...ranks,
].reverse() as BoardAxis<BoardRank>;
Object.freeze(files);
Object.freeze(ranks);
Object.freeze(orderedRanks);

export function matchingSquares(square1: BoardSquare, square2: BoardSquare) {
  return square1.rank === square2.rank && square1.file === square2.file;
}

export function getPieceAtSquare(position: BoardPosition, square: BoardSquare) {
  return position[square.rank][square.file];
}

export function getSquareAtOffset(
  square: BoardSquare,
  offsetX: number,
  offsetY: number
): BoardSquare {
  const { file, rank } = square;

  const newFile = alphabet[alphabet.indexOf(file) + offsetX] as BoardFile;
  const newRank = (rank + offsetY) as BoardRank;
  if (!files.includes(newFile))
    throw new Error(`OffsetX too large. File: ${file}, offseetX: ${offsetX}`);
  if (!ranks.includes(newRank))
    throw new Error(`OffsetY too large. Rank: ${rank}, offseetY: ${offsetY}`);

  return { file: newFile, rank: newRank };
}

export function isCornerSquare(square: BoardSquare) {
  const { file, rank } = square;
  if (rank > ranks.first && rank < ranks.last) return false;
  if (file > files.first && file < files.last) return false;

  return true;
}

export function getCastlingRank(color: PieceColor) {
  return color === 'w' ? ranks.first : ranks.last;
}

type CastlingPositionData = {
  [side in CastleSide]: {
    [piece in 'k' | 'r' | 'rFormer']: BoardSquare;
  };
};
export function getCastlingPosition(color: PieceColor): CastlingPositionData {
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

export function getKingSquare(
  boardState: BoardState,
  color: PieceColor
): BoardSquare {
  return boardState.king[color].square;
}

export function getCheckedSide(boardState: BoardState) {
  return boardState.king.checkedSide;
}

export function squareStringToObject(squareString: SquareString): BoardSquare {
  const [file, rank] = squareString.split('');
  return {
    rank: Number.parseInt(rank as string) as BoardRank,
    file: file as BoardFile,
  };
}
