import { DevError } from './errors';
import { Piece, PieceColor, PieceString, PieceType } from './pieces.types';

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
