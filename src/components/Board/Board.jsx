import React, { useEffect, useState } from 'react';

import Rank from './Rank';
import { ranks } from '../../utils/board';
import { getPieceLegalMoves, makeMove } from '../../utils/moves';
import initialBoardPosition from '../../utils/board.init';
import './Board.css';

export default function Board() {
  const [position, setPosition] = useState(initialBoardPosition);
  const [focusedPiece, setFocusedPiece] = useState({});
  const [candidateSquares, setCandidateSquares] = useState([]);

  useEffect(() => {
    if (!focusedPiece?.square) return setCandidateSquares([]);
    setCandidateSquares(getPieceLegalMoves(position, focusedPiece.square));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPiece]);

  const handlers = {
    setPieceFocus: (piece, square) => {
      if (piece && square) setFocusedPiece({ piece, square });
    },
    removePieceFocus: () => {
      setFocusedPiece({});
    },
    movePiece: (destination) => {
      setPosition(makeMove(position, focusedPiece.square, destination));
      handlers.removePieceFocus();
    },
  };
  const data = { candidateSquares, focusedPiece };
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={() => console.log(position)}>Print Board</button>
      )}
      <BoardUI {...{ position, handlers, data }} />;
    </>
  );
}

function BoardUI(props) {
  const { position, handlers, data } = props;
  const checkedSide = position[0].king.checkedSide;
  const checkedSquare = checkedSide
    ? position[0].king[checkedSide].square
    : undefined;

  return (
    <div className='board'>
      {ranks.map((rank) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank
            number={rank}
            rankPosition={position[rank]}
            checkedSquare={
              checkedSquare && checkedSquare.rank === rank
                ? checkedSquare
                : undefined
            }
            handlers={handlers}
            data={data}
          />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
