import { DevError } from './errors';

const validPieceTypes = new Set(['k', 'q', 'r', 'b', 'n', 'p']);
const validPieceColors = new Set(['b', 'w']);

function validateColor(color) {
  if (!color) throw new DevError('Containing piece must have a color');
  if (!validPieceColors.has(color))
    throw new DevError(`Invalid piece color: ${color}`);
}

function validateType(type) {
  if (!type) throw new DevError('Containing piece must have type.');
  if (!validPieceTypes.has(type))
    throw new DevError(`Invalid piece type: ${type}`);
}

export function validatePiece(piece) {
  if (!piece) return;

  if (typeof piece !== 'object' || !piece.color || !piece.type)
    throw new DevError('Piece must have color and type properties.');

  validateColor(piece.color);
  validateType(piece.type);
}

function validatePieceString(pieceString) {
  if (typeof pieceString !== 'string' || pieceString.length !== 2)
    throw new DevError(`Piece string must be length 2 string: ${pieceString}`);

  const [color, type] = pieceString.split('');
  validateColor(color);
  validateType(type);
}

export function constructPiece(pieceString) {
  validatePieceString(pieceString);

  const [color, type] = pieceString.split('');
  return { color, type };
}

export const PIECES = {
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

export function flipColor(color) {
  if (color === 'w') return 'b';
  if (color === 'b') return 'w';
  throw new DevError(`No such color: ${color}`);
}
