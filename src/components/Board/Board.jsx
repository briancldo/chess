import React, { useState } from 'react';

import Square from './Square';
import { ranks, files, getStartingPosition } from '../../utils/board';
import './Board.css';

export default function Board() {
  const [position] = useState(getStartingPosition());

  return <BoardUI position={position} />;
}

function BoardUI(props) {
  const { position } = props;

  return (
    <div className='board'>
      {ranks.map((rank, index) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank number={rank} position={position[index]} />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

function Rank(props) {
  const { number, position } = props;
  const lightSquareParity = number % 2;

  return (
    <div className='rank-wrapper'>
      {files.map((file, index) => (
        <Square
          light={index % 2 === lightSquareParity}
          containingPiece={position[index]}
          key={`rank${number}-file${file}`}
        />
      ))}
    </div>
  );
}
