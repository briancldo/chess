import React, { useState } from 'react';

import Square from './Square';
import config from '../../config/config';
import * as boardUtils from '../../utils/board';
import './Board.css';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const ranks = boardUtils.getRanks(numberRanks);
const files = boardUtils.getFiles(numberFiles);

export default function Board() {
  const [position] = useState(boardUtils.getStartingPosition());

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
