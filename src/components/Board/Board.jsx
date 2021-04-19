import React, { useEffect, useState } from 'react';

import Rank from './Rank';
import { ranks, movePiece as movePieceUtil } from '../../utils/board';
import { getPieceLegalMoves } from '../../utils/moves/moves';
import initialBoardPosition from '../../utils/board.init.json';
import './Board.css';
import { DevError } from '../../utils/errors';

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

  const hooks = {
    moves: {
      pre: {
        enPassant: () => ({}),
      },
      post: {},
    },
  };
  function validateMoveHooks(hooks, type) {
    if (!hooks) return;
    hooks.forEach((hook) => {
      if (!hooks.moves[type][hook])
        throw new DevError(`Hook doesn't exist: ${hook}`);
    });
  }
  function movePiece(destination, preMoveHooks, postMoveHooks) {
    validateMoveHooks(preMoveHooks, 'pre');
    validateMoveHooks(postMoveHooks, 'post');

    if (preMoveHooks) preMoveHooks.forEach((hook) => hooks.moves.pre[hook]());

    setPosition(movePieceUtil(position, focusedPiece.square, destination));

    if (postMoveHooks)
      postMoveHooks.forEach((hook) => hooks.moves.post[hook]());
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
