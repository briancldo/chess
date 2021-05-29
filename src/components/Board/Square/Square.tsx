import React, { CSSProperties } from 'react';
import areObjectsEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import MovablePiece from '../../Pieces/MovablePiece';
import config from '../../../config/config';
import {
  isCornerSquare,
  ranks,
  files,
  squareToCoordinate,
} from '../../../utils/board/board';
import './Square.css';
import {
  CornerSquareProps,
  SquareHighlightProps,
  SquareProps,
  SquareUIComponentProps,
} from './Square.types';

const colorScheme = config.get('square.colors.default');

const Square: React.FC<SquareProps> = (props) => {
  const {
    light,
    containingPiece,
    square,
    highlighted,
    isCurrentlyFocusedPiece,
    isChecked,
    isGameOver,
    turn,
    handlers,
  } = props;
  const squareShade = light ? 'light' : 'dark';
  const color = colorScheme[squareShade];

  function handleSquareMouseUp() {
    if (highlighted) return handlers.movePiece(square);
  }

  function handleSquareMouseDown() {
    if (isGameOver) return;
    if (!containingPiece && !highlighted) return handlers.removePieceFocus();
    if (turn !== containingPiece?.color) return;
    if (containingPiece) handlers.setPieceFocus(containingPiece, square);
  }

  const coordinate = squareToCoordinate(square);
  const testData = { coordinate, containingPiece, highlighted, light };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className='square-wrapper'
      onMouseDown={handleSquareMouseDown}
      onMouseUp={handleSquareMouseUp}
      data-testid={coordinate}
      data-test={testData}
    >
      <SquareUI color={color} square={square} />
      <SquareHighlight
        {...{ highlighted, isCurrentlyFocusedPiece, isChecked, squareShade }}
      />
      <MovablePiece {...{ containingPiece }} />
    </div>
  );
};
const omitSquareProps = ['handlers', 'key', 'get', '__proto__'];
export default React.memo(Square, shouldSquareUpdate);
function shouldSquareUpdate(oldProps: SquareProps, newProps: SquareProps) {
  return areObjectsEqual(
    omit(oldProps, omitSquareProps),
    omit(newProps, omitSquareProps)
  );
}

const SquareUIComponent: React.FC<SquareUIComponentProps> = (props) => {
  const { color, square } = props;
  const squareStyle = { fill: color };

  if (isCornerSquare(square)) return <CornerSquare square={square} />;

  return (
    <svg width='5vw' height='5vw' className='square-svg'>
      <rect width='5vw' height='5vw' style={squareStyle} />
    </svg>
  );
};
const SquareUI = React.memo(SquareUIComponent, () => true);

const CornerSquare: React.FC<CornerSquareProps> = (props) => {
  const { square } = props;
  const { rank, file } = square;

  const isLastRank = rank === ranks.last;
  const isLastFile = file === files.last;
  const corner = `${isLastRank ? 'Top' : 'Bottom'}${
    isLastFile ? 'Right' : 'Left'
  }`;
  const squareShade = isLastRank === isLastFile ? 'dark' : 'light';
  const color = colorScheme[squareShade];
  const cornerSquareStyle: CSSProperties = {
    height: '5vw',
    width: '5vw',
    [`border${corner}Radius`]: '1.3vw',
    backgroundColor: color,
    position: 'absolute',
  };
  return <div style={cornerSquareStyle} />;
};

const SquareHighlight: React.FC<SquareHighlightProps> = (props) => {
  const { highlighted, isCurrentlyFocusedPiece, isChecked } = props;
  if (!highlighted && !isCurrentlyFocusedPiece && !isChecked) return null;

  const strokeColor = getSquareHighlightColor({
    isCurrentlyFocusedPiece,
    isChecked,
  });

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
};

const highlightColors = {
  candidate: 'white',
  focused: colorScheme.lightComplement,
  checked: 'red',
};
function getSquareHighlightColor(conditions: Partial<SquareHighlightProps>) {
  const { isCurrentlyFocusedPiece, isChecked } = conditions;

  if (isCurrentlyFocusedPiece) return highlightColors.focused;
  if (isChecked) return highlightColors.checked;
  return highlightColors.candidate;
}
