import React, { useEffect, useState } from 'react';

import Rank from './Rank';
import { ranks } from '../../utils/board';
import { getPieceLegalMoves, makeMove } from '../../utils/moves/moves';
import initialBoard from '../../utils/board.init';
import './Board.css';

export default function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [focusedPiece, setFocusedPiece] = useState({});
  const [candidateSquares, setCandidateSquares] = useState([]);
  const result = board.state.result;

  useEffect(() => {
    if (!focusedPiece?.square) return setCandidateSquares([]);
    setCandidateSquares(getPieceLegalMoves(board, focusedPiece.square));
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
      setBoard((board) => makeMove(board, focusedPiece.square, destination));
      handlers.removePieceFocus();
    },
  };
  const data = { candidateSquares, focusedPiece };
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={() => console.log(board)}>Print Board</button>
      )}
      <BoardUI
        {...{ board, handlers, data, frozen: result.value !== undefined }}
      />
      ;
    </>
  );
}

function BoardUI(props) {
  const { board, handlers, data, frozen } = props;
  const checkedSide = board.state.king.checkedSide;
  const checkedSquare = checkedSide
    ? board.state.king[checkedSide].square
    : undefined;

  return (
    <div className={frozen ? 'board-frozen' : 'board'}>
      {ranks.map((rank) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank
            number={rank}
            rankPosition={board.position[rank]}
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
