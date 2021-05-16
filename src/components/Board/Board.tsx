import React, { useEffect, useState } from 'react';

import Rank from './Rank';
import { ranks } from '../../utils/board';
import { getPieceLegalMoves, makeMove } from '../../utils/moves/moves';
import { tempHandleGameOver } from '../../utils/game';
import initialBoard from '../../utils/board.init';
import './Board.css';
import { BoardSquare, GameResult } from '../../utils/board.types';
import { BoardHandlers, BoardUIProps, FocusedPiece } from './Board.types';

export default function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [focusedPiece, setFocusedPiece] = useState<FocusedPiece>({});
  const [candidateSquares, setCandidateSquares] = useState<BoardSquare[]>([]);
  const gameOver = board.state.result !== undefined;
  if (gameOver) tempHandleGameOver(board.state.result as GameResult);

  useEffect(() => {
    if (!('square' in focusedPiece)) return setCandidateSquares([]);
    setCandidateSquares(
      getPieceLegalMoves(board, focusedPiece.square, focusedPiece.piece)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPiece]);

  const handlers: BoardHandlers = {
    setPieceFocus: (piece, square) => {
      if (piece && square) setFocusedPiece({ piece, square });
    },
    removePieceFocus: () => {
      setFocusedPiece({});
    },
    movePiece: (destination) => {
      if (!('square' in focusedPiece)) return;
      setBoard((board) => makeMove(board, focusedPiece.square, destination));
      handlers.removePieceFocus();
    },
  };
  const data = { candidateSquares, focusedPiece, gameOver };
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={() => console.log(board)} className='debug-button'>
          Print Board
        </button>
      )}
      <BoardUI {...{ board, handlers, data }} />;
    </>
  );
}

const BoardUI: React.FC<BoardUIProps> = (props) => {
  const { board, handlers, data } = props;
  const checkedSide = board.state.king.checkedSide;
  const checkedSquare = checkedSide
    ? board.state.king[checkedSide].square
    : undefined;

  return (
    <div className='board'>
      {ranks.map((rank) => (
        <React.Fragment key={`rank${rank}`}>
          <Rank
            number={rank}
            fullRank={board.position[rank]}
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
};
