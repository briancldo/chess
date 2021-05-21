import React from 'react';

import Square from './Square';
import { files, matchingSquares } from '../../utils/board';
import { RankProps } from './Rank.types';
import { BoardSquare } from '../../utils/board.types';

const Rank: React.FC<RankProps> = (props) => {
  const { number, fullRank, checkedSquare, handlers, data } = props;
  const lightSquareParity = number % 2;

  return (
    <div className='rank-wrapper'>
      {files.map((file, index) => {
        const square = { rank: number, file };
        const highlighted = data.candidateSquares.some(
          (candidateSquare: BoardSquare) =>
            matchingSquares(candidateSquare, square)
        );
        const isCurrentlyFocusedPiece =
          'square' in data.focusedPiece
            ? matchingSquares(data.focusedPiece.square, square)
            : false;

        return (
          <Square
            key={`rank${number}-file${file}`}
            light={index % 2 === lightSquareParity}
            containingPiece={fullRank[file]}
            square={square}
            highlighted={highlighted}
            isCurrentlyFocusedPiece={isCurrentlyFocusedPiece}
            isChecked={checkedSquare && checkedSquare.file === file}
            isGameOver={data.gameOver}
            turn={data.turn}
            handlers={handlers}
          />
        );
      })}
    </div>
  );
};

export default Rank;
