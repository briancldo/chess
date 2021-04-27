import React from 'react';
import areObjectsEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import MovablePiece from '../Pieces/MovablePiece';
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

  function handleSquareMouseUp() {
    if (highlighted) return handlers.movePiece(square);
  }

  function handleSquareMouseDown() {
    if (!containingPiece && !highlighted) return handlers.removePieceFocus();
    handlers.setPieceFocus(containingPiece, square);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events
    <div
      className='square-wrapper'
      onMouseDown={handleSquareMouseDown}
      onMouseUp={handleSquareMouseUp}
    >
      <SquareUI color={color} square={square} />
      <SquareHighlight {...{ highlighted, isCurrentlyFocusedPiece }} />
      <MovablePiece {...{ containingPiece }} />
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
