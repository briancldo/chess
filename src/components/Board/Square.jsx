import React from 'react';

import Piece from '../Pieces/Piece';
import config from '../../config/config';
import { DevError } from '../../utils/errors';
import './Square.css';
const colorScheme = config.get('square.colors.default');

export default function Square(props) {
  const { light, containingPiece } = props;
  const color = colorScheme[light ? 'light' : 'dark'];
  validateContainingPiece(containingPiece);

  return (
    <div className='square-wrapper'>
      <svg width='5vw' height='5vw' className='square-svg'>
        <rect width='5vw' height='5vw' style={{ fill: color }} />
      </svg>
      {containingPiece && <PieceWrapper {...containingPiece} />}
    </div>
  );
}

function PieceWrapper(props) {
  const { type, color } = props;

  return (
    <div className='piece-wrapper-outer'>
      <div className='piece-wrapper-inner'>
        <Piece {...{ type, color }} />
      </div>
    </div>
  );
}

const validPieceTypes = new Set([
  'king',
  'queen',
  'rook',
  'bishop',
  'knight',
  'pawn',
]);
const validPieceColors = new Set(['black', 'white']);
function validateContainingPiece(containingPiece) {
  if (!containingPiece) return;

  if (typeof containingPiece !== 'object')
    throw new DevError('Containing piece must be an object.');

  const { type, color } = containingPiece;
  if (!type) throw new DevError('Containing piece must have type.');
  if (!validPieceTypes.has(type))
    throw new DevError(`Invalid piece type: ${type}`);

  if (!color) throw new DevError('Containing piece must have a color');
  if (!validPieceColors.has(color))
    throw new DevError(`Invalid piece color: ${color}`);
}
