import React from 'react';
import areObjectsEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import Piece from '../Pieces/Piece';
import config from '../../config/config';
import { validatePiece } from '../../utils/pieces';
import './Square.css';

const colorScheme = config.get('square.colors.default');

function Square(props) {
  const {
    light,
    containingPiece,
    square,
    highlighted,
    isCurrentlyFocusedPiece,
    handlers,
    // data,
  } = props;
  const color = colorScheme[light ? 'light' : 'dark'];
  validatePiece(containingPiece);

  function handleSquareClick() {
    if (highlighted) return handlers.movePiece(square);

    if (isCurrentlyFocusedPiece || (!containingPiece && !highlighted))
      return handlers.removePieceFocus();

    handlers.setPieceFocus(containingPiece, square);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className='square-wrapper' onClick={handleSquareClick}>
      <SquareUI color={color} />
      <PieceWrapper {...{ containingPiece }} />
      <SquareHighlight {...{ highlighted, isCurrentlyFocusedPiece }} />
    </div>
  );
}
const omitSquareProps = ['handlers', 'data', 'key', 'get', '__proto__'];
export default React.memo(Square, shouldSquareUpdate);
function shouldSquareUpdate(oldProps, newProps) {
  return areObjectsEqual(
    omit(oldProps, omitSquareProps),
    omit(newProps, omitSquareProps)
  );
}

function SquareUI(props) {
  const { color } = props;
  const squareStyle = { fill: color };

  return (
    <svg width='5vw' height='5vw' className='square-svg'>
      <rect width='5vw' height='5vw' style={squareStyle} />
    </svg>
  );
}

function PieceWrapper(props) {
  const { containingPiece } = props;
  if (!containingPiece) return null;
  const { color, type } = containingPiece;

  return (
    <div className='piece-wrapper-outer'>
      <div className='piece-wrapper-inner'>
        <Piece {...{ type, color }} />
      </div>
    </div>
  );
}

function SquareHighlight(props) {
  const { highlighted, isCurrentlyFocusedPiece } = props;
  if (!highlighted && !isCurrentlyFocusedPiece) return null;
  const strokeColor = isCurrentlyFocusedPiece ? 'red' : 'white';

  return (
    <div className='square-highlight-wrapper'>
      <svg height='4.5vw' width='4.5vw'>
        <rect
          height='4.5vw'
          width='4.5vw'
          stroke={strokeColor}
          strokeWidth='0.25vw'
          fill='transparent'
        />
      </svg>
    </div>
  );
}
