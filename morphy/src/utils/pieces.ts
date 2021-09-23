import { DevError } from './errors';
import {
  Piece,
  PieceColor,
  PieceColorFull,
  PieceString,
  PieceType,
  PromotionPiece,
  PromotionPieceType,
} from './pieces.types';

export const PIECES: {
  [side in PieceColor]: { [piece in PieceType]: Piece };
} = {
  b: {
    k: { type: 'k', color: 'b' },
    q: { type: 'q', color: 'b' },
    r: { type: 'r', color: 'b' },
    b: { type: 'b', color: 'b' },
    n: { type: 'n', color: 'b' },
    p: { type: 'p', color: 'b' },
  },
  w: {
    k: { type: 'k', color: 'w' },
    q: { type: 'q', color: 'w' },
    r: { type: 'r', color: 'w' },
    b: { type: 'b', color: 'w' },
    n: { type: 'n', color: 'w' },
    p: { type: 'p', color: 'w' },
  },
};
export const promotionPieceTypes: PromotionPieceType[] = ['q', 'r', 'b', 'n'];

export function flipColor(color: PieceColor): PieceColor {
  if (color === 'w') return 'b';
  if (color === 'b') return 'w';
  throw new DevError(`No such color: ${color}`);
}

export function pieceStringToObject(pieceString: PieceString): Piece {
  const [color, type] = pieceString.split('') as [PieceColor, PieceType];
  return { type, color };
}

export function pieceObjectToString(piece: Piece): PieceString {
  const { type, color } = piece;
  return `${color}${type}` as PieceString;
}

export function matchingPieces(piece1?: Piece, piece2?: Piece) {
  if (!piece1 || !piece2) return false;

  return piece1.color === piece2.color && piece1.type === piece2.type;
}

export function isPromotionPiece(piece: Piece): piece is PromotionPiece {
  return (promotionPieceTypes as PieceType[]).includes(piece.type);
}

export function isPromotedPiece(piece: Piece): piece is PromotionPiece {
  if (!isPromotionPiece(piece)) return false;
  return piece.promoted === true;
}

const pieceOrdering = {
  k: 0,
  p: 1,
  n: 2,
  b: 3,
  r: 4,
  q: 5,
};
export function comparePieceTypes(type1: PieceType, type2: PieceType) {
  return pieceOrdering[type1] > pieceOrdering[type2] ? 1 : -1;
}

export function getShorthandColor(
  color: PieceColor | PieceColorFull
): PieceColor {
  if (color === 'white') return 'w';
  if (color === 'black') return 'b';
  return color;
}
