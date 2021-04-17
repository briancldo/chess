import React, { useState } from 'react';

import Square from './Square';
import { ranks, files, getStartingPosition } from '../../utils/board';
import './Board.css';

export default function Board() {
  const [position] = useState(getStartingPosition());
  const [focusedPiece, setFocusedPiece] = useState({});
  console.log({ focusedPiece });

  const handlers = {
    setPieceFocus: (piece, coordinate) => {
      if (piece && coordinate) setFocusedPiece({ piece, coordinate });
    },
  };
  return <BoardUI {...{ position, handlers }} />;
}

function BoardUI(props) {
  const { position, handlers } = props;

  return (
    <div className='board'>
      {ranks.map((rank, index) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank number={rank} position={position[index]} handlers={handlers} />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

function Rank(props) {
  const { number, position, handlers } = props;
  const lightSquareParity = number % 2;

  return (
    <div className='rank-wrapper'>
      {files.map((file, index) => (
        <Square
          key={`rank${number}-file${file}`}
          light={index % 2 === lightSquareParity}
          containingPiece={position[index]}
          coordinate={`${file}${number}`}
          handlers={handlers}
        />
      ))}
    </div>
  );
}
