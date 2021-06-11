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
  customPosition?: ConcisePosition,
  customState?: BoardSubstate
): BoardKingState {
  const priorKingState: BoardKingState = produce(
    initialBoard.state.king,
    (draft) => {
      if (customState?.king?.w?.square)
        draft.w.square = customState.king.w.square as BoardSquare;
      if (customState?.king?.b?.square)
        draft.b.square = customState.king.b.square as BoardSquare;
    }
  );

  return produce(priorKingState, (draft) => {
    if (!customPosition) return;
    if (Array.isArray(customPosition.wk) && customPosition.wk.length !== 1)
      throw new DevError('Only one white king.');
    if (Array.isArray(customPosition.bk) && customPosition.bk.length !== 1)
      throw new DevError('Only one black king.');

    const whiteKingCoordinate = Array.isArray(customPosition.wk)
      ? customPosition.wk[0]
      : customPosition.wk;
    const blackKingCoordinate = Array.isArray(customPosition.bk)
      ? customPosition.bk[0]
      : customPosition.bk;

    draft.w.square = whiteKingCoordinate
      ? coordinateToSquare(whiteKingCoordinate)
      : undefined;
    draft.b.square = blackKingCoordinate
      ? coordinateToSquare(blackKingCoordinate)
      : undefined;
  });
}

export function synchronizeCheckState(
  customState: BoardSubstate & { king: BoardKingState },
  customPosition?: ConcisePosition
): { checkState: BoardCheckState; turnState: PieceColor } {
  const priorCheckState: BoardCheckState = produce(
    initialBoard.state.check,
    (draft) => {
      if (customState?.check?.side) draft.side = customState.check.side;
      if (customState?.check?.details)
        draft.details = customState.check.details as BoardCheckDetails;
    }
  );

  if (!customPosition)
    return {
      checkState: priorCheckState,
      turnState: customState?.turn || initialBoard.state.turn,
    };

  const board: Board = {
    position: createFromConcisePosition(customPosition),
    state: customState as BoardState,
  };
  const isWhiteChecked = customState?.king.w.square
    ? isSquareAttacked(customState?.king.w.square as BoardSquare, 'w', board)
    : false;
  const isBlackChecked = customState?.king.b.square
    ? isSquareAttacked(customState?.king.b.square as BoardSquare, 'b', board)
    : false;
  const checkedSide: PieceColor = isWhiteChecked ? 'w' : 'b';

  if (isWhiteChecked && isBlackChecked)
    throw new Error('Both kings cannot be checked.');
  if (!isWhiteChecked && !isBlackChecked)
    return {
      checkState: priorCheckState,
      turnState: customState?.turn || initialBoard.state.turn,
    };

  return {
    checkState: computeCheckState(
      board,
      priorCheckState,
      customState,
      checkedSide
    ),
    turnState: checkedSide,
  };
}

function computeCheckState(
  board: Board,
  priorCheckState: BoardCheckState,
  customState: BoardSubstate & { king: BoardKingState },
  checkedSide: PieceColor
): BoardCheckState {
  const kingSquare = customState.king[checkedSide].square as BoardSquare;
  const threatPieces = getThreatPieces(board, kingSquare, checkedSide);
  const threatSquares = getThreatSquares(kingSquare, threatPieces);
  return produce(priorCheckState, (draft) => {
    draft.side = checkedSide;
    draft.details = { threatPieces, threatSquares };
  });
}
