import React from 'react';

import Piece from '../Pieces/Piece';
import config from '../../config/config';
import { validatePiece } from '../../utils/pieces';
import './Square.css';
const colorScheme = config.get('square.colors.default');

export default function Square(props) {
  const { light, containingPiece } = props;
  const color = colorScheme[light ? 'light' : 'dark'];
  validatePiece(containingPiece);

  return (
    <div className='square-wrapper'>
      <svg width='5vw' height='5vw' className='square-svg'>
        <rect width='5vw' height='5vw' style={{ fill: color }} />
      </svg>
      {containingPiece && <PieceWrapper {...{ containingPiece }} />}
    </div>
  );
}

function PieceWrapper(props) {
  const { containingPiece } = props;
  const [color, type] = containingPiece.split('');

  return (
    <div className='piece-wrapper-outer'>
      <div className='piece-wrapper-inner'>
        <Piece {...{ type, color }} />
      </div>
    </div>
  );
}
