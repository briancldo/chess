import React, { useEffect, useState } from 'react';

import Square from './Square';
import {
  ranks,
  files,
  matchingSquares,
  movePiece as movePieceUtil,
} from '../../utils/board';
import { getPieceLegalMoves } from '../../utils/moves/moves';
import initialBoardPosition from '../../utils/board.init.json';
import './Board.css';

export default function Board() {
  const [position, setPosition] = useState(initialBoardPosition);
  const [focusedPiece, setFocusedPiece] = useState({});
  const [candidateSquares, setCandidateSquares] = useState([]);

  useEffect(() => {
    if (focusedPiece.square)
      setCandidateSquares(getPieceLegalMoves(position, focusedPiece.square));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPiece]);

  function setPieceFocus(piece, square) {
    if (piece && square) setFocusedPiece({ piece, square });
  }
  function removePieceFocus() {
    setFocusedPiece({});
    setCandidateSquares([]);
  }
  function movePiece(destination) {
    setPosition(movePieceUtil(position, focusedPiece.square, destination));
    removePieceFocus();
  }
  const handlers = { setPieceFocus, removePieceFocus, movePiece };
  const data = { candidateSquares, focusedPiece };
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
            rankPosition={position[rank]}
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
  const { number, rankPosition, handlers, data } = props;
  const lightSquareParity = number % 2;

  return (
    <div className='rank-wrapper'>
      {files.map((file, index) => {
        const square = { rank: number, file };
        const highlighted = data.candidateSquares.some((candidateSquare) =>
          matchingSquares(candidateSquare, square)
        );
        const currentlyFocusedPiece = matchingSquares(
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
            currentlyFocusedPiece={currentlyFocusedPiece}
            handlers={handlers}
          />
        );
      })}
    </div>
  );
}
