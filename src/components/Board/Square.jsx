import React from 'react';

import Piece from '../Pieces/Piece';
import config from '../../config/config';
import { validatePiece } from '../../utils/pieces';
import './Square.css';

const colorScheme = config.get('square.colors.default');

export default function Square(props) {
  const { light, containingPiece, square, highlighted, handlers } = props;
  const color = colorScheme[light ? 'light' : 'dark'];
  validatePiece(containingPiece);

  function handlePieceClick() {
    handlers.setPieceFocus(containingPiece, square);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className='square-wrapper' onClick={handlePieceClick}>
      <svg width='5vw' height='5vw' className='square-svg'>
        <rect width='5vw' height='5vw' style={{ fill: color }} />
      </svg>
      {containingPiece && <PieceWrapper {...{ containingPiece }} />}
      {highlighted && (
        <div className='square-highlight-wrapper'>
          <svg height='5vw' width='5vw'>
            <rect height='5vw' width='5vw' stroke='white' fill='transparent' />
          </svg>
        </div>
      )}
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
