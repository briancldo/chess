import React from 'react';
import areObjectsEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import config from '../../../config/config';
import { SquareUI } from './SquareUI';
import PromotionSquare from './PromotionSquare';
import {
  matchingSquares,
  squareToCoordinate,
} from '../../../utils/board/square/square';
import './Square.css';
import { SquareProps } from './Square.types';
import { SquareMetadata } from '../../../__tests__/__utils__/squareInteraction';

const colorScheme = config.get('square.colors.default');

// eslint-disable-next-line sonarjs/cognitive-complexity
const Square: React.FC<SquareProps> = (props) => {
  const {
    light,
    containingPiece,
    square,
    hideHighlights,
    highlighted,
    isCurrentlyFocusedPiece,
    isChecked,
    isGameOver,
    turn,
    promotion,
    handlers,
  } = props;
  const squareShade = light ? 'light' : 'dark';
  const color: string = colorScheme[squareShade];

  if (promotion.active && matchingSquares(square, promotion.square))
    return (
      <PromotionSquare
        square={square}
        selectPromotionPiece={handlers.selectPromotionPiece}
      />
    );

  function handleSquareMouseUp() {
    if (highlighted) return handlers.movePiece(square);
  }

  function handleSquareMouseDown() {
    if (isGameOver) return;
    if (promotion.active) return;
    if (!containingPiece && !highlighted) return handlers.removePieceFocus();
    if (turn !== containingPiece?.color) return;
    if (containingPiece) handlers.setPieceFocus(containingPiece, square);
  }

  const coordinate = squareToCoordinate(square);
  const metadata: SquareMetadata = {
    coordinate,
    containingPiece,
    highlighted,
    light,
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className='square-wrapper'
      onMouseDown={handleSquareMouseDown}
      onMouseUp={handleSquareMouseUp}
      data-testid={coordinate}
      data-test={JSON.stringify(metadata)}
    >
      <SquareUI
        {...{
          color,
          square,
          hideHighlights,
          highlighted,
          isCurrentlyFocusedPiece,
          isChecked,
          squareShade,
          containingPiece,
        }}
      />
    </div>
  );
};
const omitSquareProps = ['key', 'get', '__proto__'];
export default React.memo(Square, shouldSquareUpdate);
function shouldSquareUpdate(oldProps: SquareProps, newProps: SquareProps) {
  return areObjectsEqual(
    omit(oldProps, omitSquareProps),
    omit(newProps, omitSquareProps)
  );
}
