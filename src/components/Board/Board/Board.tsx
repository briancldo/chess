import React, { useEffect, useState } from 'react';
import { produce } from 'immer';

import Rank from '../Rank/Rank';
import { getSquareAtOffset, ranks } from '../../../utils/board/board';
import { getPieceLegalMoves, makeMove } from '../../../utils/moves/moves';
import './Board.css';
import { BoardSquare, GameResult } from '../../../utils/board/board.types';
import {
  BoardProps,
  BoardHandlers,
  BoardUIProps,
  FocusedPiece,
} from './Board.types';
import { BoardTestData } from '../../../__tests__/__utils__/board.utils';
import { getDirection } from '../../../utils/moves/utils';

const Board: React.FC<BoardProps> = (props) => {
  const [board, setBoard] = useState(props.initialBoard);
  const [focusedPiece, setFocusedPiece] = useState<FocusedPiece>({});
  const [candidateSquares, setCandidateSquares] = useState<BoardSquare[]>([]);
  const turn = board.state.turn;
  const gameOver = board.state.result !== undefined;

  useEffect(() => {
    if (gameOver)
      props.handlers.handleGameOver(board.state.result as GameResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.state.result, gameOver]);

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
    selectPromotionPiece(piece, promotionSquare) {
      const direction = getDirection(piece.color);
      const boardPrePromo = produce(board, (draft) => {
        const { file, rank } = promotionSquare;
        draft.position[rank][file] = piece;
      });
      setBoard(makeMove(boardPrePromo, promotionSquare, promotionSquare));
    },
  };
  const data = {
    candidateSquares,
    focusedPiece,
    gameOver,
    turn,
    promotion: board.state.promotion,
  };
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={() => console.log(board)} className='debug-button'>
          Print Board
        </button>
      )}
      <BoardUI {...{ board, handlers, data }} />
    </>
  );
};
export default Board;

export const BoardUI: React.FC<BoardUIProps> = (props) => {
  const { board, handlers, data } = props;
  const checkedSide = board.state.check.side;
  const checkedSquare = checkedSide
    ? board.state.king[checkedSide].square
    : undefined;

  const boardTestData: BoardTestData = { board };
  return (
    <div
      data-testid='board'
      data-test={JSON.stringify(boardTestData)}
      className='board'
    >
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
