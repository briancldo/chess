import produce from 'immer';

import initialBoard from '../board.init';
import { coordinateToSquare } from '../board';
import {
  BoardSubstate,
  BoardKingState,
  BoardSquare,
  BoardCheckState,
  BoardCheckDetails,
  Board,
  BoardState,
} from '../board.types';
import { ConcisePosition } from './boardEditor.types';
import { DevError } from '../../errors';
import { isSquareAttacked } from '../../moves/utils';
import { createFromConcisePosition } from './boardEditor';
import { PieceColor } from '../../pieces.types';
import { getThreatPieces, getThreatSquares } from '../../moves/checks';

export function synchronizeKingState(
  position?: ConcisePosition,
  state?: BoardSubstate
): BoardKingState {
  const priorKingState: BoardKingState = produce(
    initialBoard.state.king,
    (draft) => {
      if (state?.king?.w?.square)
        draft.w.square = state.king.w.square as BoardSquare;
      if (state?.king?.b?.square)
        draft.b.square = state.king.b.square as BoardSquare;
    }
  );

  return produce(priorKingState, (draft) => {
    if (!position) return;
    if (Array.isArray(position.wk) && position.wk.length !== 1)
      throw new DevError('Only one white king.');
    if (Array.isArray(position.bk) && position.bk.length !== 1)
      throw new DevError('Only one black king.');

    const whiteKingCoordinate = Array.isArray(position.wk)
      ? position.wk[0]
      : position.wk;
    const blackKingCoordinate = Array.isArray(position.bk)
      ? position.bk[0]
      : position.bk;

    draft.w.square = whiteKingCoordinate
      ? coordinateToSquare(whiteKingCoordinate)
      : undefined;
    draft.b.square = blackKingCoordinate
      ? coordinateToSquare(blackKingCoordinate)
      : undefined;
  });
}

export function synchronizeCheckState(
  state: BoardSubstate & { king: BoardKingState },
  position?: ConcisePosition
): { checkState: BoardCheckState; turnState: PieceColor } {
  const priorCheckState: BoardCheckState = produce(
    initialBoard.state.check,
    (draft) => {
      if (state?.check?.side) draft.side = state.check.side;
      if (state?.check?.details)
        draft.details = state.check.details as BoardCheckDetails;
    }
  );

  if (!position)
    return {
      checkState: priorCheckState,
      turnState: state?.turn || initialBoard.state.turn,
    };

  const board: Board = {
    position: createFromConcisePosition(position),
    state: state as BoardState,
  };
  const isWhiteChecked = state?.king.w.square
    ? isSquareAttacked(state?.king.w.square as BoardSquare, 'w', board)
    : false;
  const isBlackChecked = state?.king.b.square
    ? isSquareAttacked(state?.king.b.square as BoardSquare, 'b', board)
    : false;
  const checkedSide: PieceColor = isWhiteChecked ? 'w' : 'b';

  if (isWhiteChecked && isBlackChecked)
    throw new Error('Both kings cannot be checked.');
  if (!isWhiteChecked && !isBlackChecked)
    return {
      checkState: priorCheckState,
      turnState: state?.turn || initialBoard.state.turn,
    };

  const checkState = produce(priorCheckState, (draft) => {
    /*
      white_king_checked = ...
      black_king_checked = ...

      if (white & black king checked) throw error
      if (neither king checked) return;

      check.side = white_king_checked ? 'w' : 'b'
      check.details = {
        threatPieces: ...,
        threatSquares: ...,
      }
      turn: white_king_checked: ? 'w' : 'b'
    */

    draft.side = checkedSide;
    const kingSquare = state.king[checkedSide].square as BoardSquare;
    const threatPieces = getThreatPieces(board, kingSquare, checkedSide);
    const threatSquares = getThreatSquares(kingSquare, threatPieces);
    draft.details = { threatPieces, threatSquares };
  });

  const turnState = checkedSide;

  return { checkState, turnState };
}
