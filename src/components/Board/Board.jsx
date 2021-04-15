import React from 'react';

import Square from './Square';
import config from '../../config/config';
import * as boardUtils from '../../utils/board';
import './Board.css';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const ranks = boardUtils.getRanks(numberRanks);
const files = boardUtils.getFiles(numberFiles);

function Rank(props) {
  const { number } = props;
  const lightSquareParity = number % 2;

  return (
    <>
      {files.map((file, index) => (
        <Square
          light={index % 2 === lightSquareParity}
          key={`rank${number}-file${file}`}
        />
      ))}
    </>
  );
}

export default function Board() {
  return (
    <div className='board'>
      {ranks.map((rank) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank number={rank} />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
