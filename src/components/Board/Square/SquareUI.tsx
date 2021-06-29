import React from 'react';

import { isCornerSquare, ranks, files } from '../../../utils/board/board';
import MovablePiece from '../../Pieces/MovablePiece';
import RoundedSquare from './RoundedSquare';
import {
  SquareUIProps,
  LiteralSquareProps,
  CornerSquareProps,
  SquareHighlightProps,
} from './Square.types';
import config from '../../../config/config';

const colorScheme = config.get('square.colors.default');

export const SquareUI: React.FC<SquareUIProps> = (props) => {
  const {
    color,
    square,
    hideHighlights,
    highlighted,
    isCurrentlyFocusedPiece,
    isChecked,
    squareShade,
    containingPiece,
    className,
  } = props;

  return (
    <div className={className}>
      <LiteralSquare color={color} square={square} />
      {!hideHighlights && (
        <SquareHighlight
          {...{ highlighted, isCurrentlyFocusedPiece, isChecked, squareShade }}
        />
      )}
      <div className='square-containing-piece'>
        <MovablePiece {...{ containingPiece }} />
      </div>
    </div>
  );
};

const LiteralSquareComponent: React.FC<LiteralSquareProps> = (props) => {
  const { color, square } = props;
  const squareStyle = { fill: color };

  if (square && isCornerSquare(square))
    return <CornerSquare color={color} square={square} />;

  return (
    <svg width='5vw' height='5vw' className='square-svg'>
      <rect width='5vw' height='5vw' style={squareStyle} />
    </svg>
  );
};
export const LiteralSquare = React.memo(LiteralSquareComponent, () => true);

const CornerSquare: React.FC<CornerSquareProps> = (props) => {
  const { color: colorProp, square } = props;
  const { rank, file } = square;

  const isLastRank = rank === ranks.last;
  const isLastFile = file === files.last;
  const corner = `${isLastRank ? 'Top' : 'Bottom'}${
    isLastFile ? 'Right' : 'Left'
  }`;
  const squareShade = isLastRank === isLastFile ? 'dark' : 'light';
  const color = colorProp || colorScheme[squareShade];

  return <RoundedSquare {...{ color, [corner]: true }} />;
};

export const SquareHighlight: React.FC<SquareHighlightProps> = (props) => {
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
