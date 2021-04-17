import React, { useEffect, useState } from 'react';

import Square from './Square';
import { ranks, files, getStartingPosition } from '../../utils/board';
import { getPieceLegalMoves } from '../../utils/moves';
import './Board.css';

export default function Board() {
  const [position] = useState(getStartingPosition());
  const [focusedPiece, setFocusedPiece] = useState({});
  const [candidateSquares, setCandidateSquares] = useState([]);

  useEffect(() => {
    if (focusedPiece.coordinate)
      setCandidateSquares(
        getPieceLegalMoves(position, focusedPiece.coordinate)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPiece]);

  const handlers = {
    setPieceFocus: (piece, coordinate) => {
      if (piece && coordinate) setFocusedPiece({ piece, coordinate });
    },
  };
  const data = { candidateSquares };
  return <BoardUI {...{ position, handlers, data }} />;
}

function BoardUI(props) {
  const { position, handlers, data } = props;

  return (
    <div className='board'>
      {ranks.map((rank) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank
            number={rank}
            position={position[rank - 1]}
            handlers={handlers}
            data={data}
          />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

function Rank(props) {
  const { number, position, handlers, data } = props;
  const lightSquareParity = number % 2;

  return (
    <div className='rank-wrapper'>
      {files.map((file, index) => {
        const coordinate = `${file}${number}`;
        const highlighted = data.candidateSquares.includes(coordinate);

        return (
          <Square
            key={`rank${number}-file${file}`}
            light={index % 2 === lightSquareParity}
            containingPiece={position[index]}
            coordinate={coordinate}
            highlighted={highlighted}
            handlers={handlers}
          />
        );
      })}
    </div>
  );
}
