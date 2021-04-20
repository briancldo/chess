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
  BLACK: {
    KING: { type: 'k', color: 'b' },
    QUEEN: { type: 'q', color: 'b' },
    ROOK: { type: 'r', color: 'b' },
    BISHOP: { type: 'b', color: 'b' },
    KNIGHT: { type: 'n', color: 'b' },
    PAWN: { type: 'p', color: 'b' },
  },
  WHITE: {
    KING: { type: 'k', color: 'w' },
    QUEEN: { type: 'q', color: 'w' },
    ROOK: { type: 'r', color: 'w' },
    BISHOP: { type: 'b', color: 'w' },
    KNIGHT: { type: 'n', color: 'w' },
    PAWN: { type: 'p', color: 'w' },
  },
};
