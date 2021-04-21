import React from 'react';
import areObjectsEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import Piece from '../Pieces/Piece';
import config from '../../config/config';
import { isCornerSquare, ranks, files } from '../../utils/board';
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
      <SquareUI color={color} square={square} />
      <PieceWrapper {...{ containingPiece }} />
      <SquareHighlight {...{ highlighted, isCurrentlyFocusedPiece }} />
    </div>
  );
}
const omitSquareProps = ['handlers', 'key', 'get', '__proto__'];
export default React.memo(Square, shouldSquareUpdate);
function shouldSquareUpdate(oldProps, newProps) {
  return areObjectsEqual(
    omit(oldProps, omitSquareProps),
    omit(newProps, omitSquareProps)
  );
}

function SquareUIComponent(props) {
  const { color, square } = props;
  const squareStyle = { fill: color };

  if (isCornerSquare(square)) return <CornerSquare square={square} />;

  return (
    <svg width='5vw' height='5vw' className='square-svg'>
      <rect width='5vw' height='5vw' style={squareStyle} />
    </svg>
  );
}
const SquareUI = React.memo(SquareUIComponent, () => true);

function CornerSquare(props) {
  const { square } = props;
  const { rank, file } = square;
  console.log('corner');

  const isLastRank = rank === ranks.last;
  const isLastFile = file === files.last;
  let corner = `${isLastRank ? 'Top' : 'Bottom'}${
    isLastFile ? 'Right' : 'Left'
  }`;
  const squareType = isLastRank === isLastFile ? 'dark' : 'light';
  const color = colorScheme[squareType];
  const cornerSquareStyle = {
    height: '5vw',
    width: '5vw',
    [`border${corner}Radius`]: '1.3vw',
    backgroundColor: color,
    position: 'absolute',
  };
  return <div style={cornerSquareStyle} />;
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
