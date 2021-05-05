import React from 'react';

import Square from './Square';
import { files, matchingSquares } from '../../utils/board';

export default function Rank(props) {
  const { number, rankPosition, checkedSquare, handlers, data } = props;
  const lightSquareParity = number % 2;

  return (
    <div className='rank-wrapper'>
      {files.map((file, index) => {
        const square = { rank: number, file };
        const highlighted = data.candidateSquares.some((candidateSquare) =>
          matchingSquares(candidateSquare, square)
        );
        const isCurrentlyFocusedPiece = matchingSquares(
          data.focusedPiece.square || {},
          square
        );

        return (
          <Square
            key={`rank${number}-file${file}`}
            light={index % 2 === lightSquareParity}
            containingPiece={rankPosition[file]}
            square={square}
            highlighted={highlighted}
            isCurrentlyFocusedPiece={isCurrentlyFocusedPiece}
            isChecked={checkedSquare && checkedSquare.file === file}
            isGameOver={data.gameOver}
            handlers={handlers}
          />
        );
      })}
    </div>
  );
}
