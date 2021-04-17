import { DevError } from './errors';

const validPieceTypes = new Set(['k', 'q', 'r', 'b', 'n', 'p']);
const validPieceColors = new Set(['b', 'w']);
function validatePiece(piece) {
  if (!piece) return;

  if (typeof piece !== 'string' || piece.length !== 2)
    throw new DevError('Containing piece must be a string of length 2.');

  const [color, type] = piece.split('');
  if (!type) throw new DevError('Containing piece must have type.');
  if (!validPieceTypes.has(type))
    throw new DevError(`Invalid piece type: ${type}`);

  if (!color) throw new DevError('Containing piece must have a color');
  if (!validPieceColors.has(color))
    throw new DevError(`Invalid piece color: ${color}`);
}

export { validatePiece };
