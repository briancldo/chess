import React, { useEffect, useState } from 'react';

import Rank from './Rank';
import { ranks, promotePawn as promotePawnUtil } from '../../utils/board';
import { getPieceLegalMoves, makeMove } from '../../utils/moves/moves';
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
    promotePawn: (promotionPiece, promotionSquare) => {
      setPosition(
        promotePawnUtil(
          position,
          promotionPiece,
          promotionSquare,
          focusedPiece.square
        )
      );
      handlers.removePieceFocus({});
    },
  };
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
