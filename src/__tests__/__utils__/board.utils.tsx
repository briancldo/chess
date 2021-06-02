import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import {
  createBoard,
  createFromConcisePosition,
} from '../../utils/board/boardEditor';
import { emptyBoardHandlers } from '../components/support/Board.data';
import { Board as BoardType } from '../../utils/board/board.types';

const emptyConcisePosition = createFromConcisePosition({});
const emptyBoard = createBoard({ position: emptyConcisePosition });
export function renderEmptyBoard() {
  return render(
    <Board
      key={uuidv4()}
      initialBoard={emptyBoard}
      handlers={emptyBoardHandlers}
    />
  );
}

export interface BoardTestData {
  board: BoardType;
}
export function getBoardTestData() {
  const boardTestDataString = screen
    .getByTestId('board')
    .getAttribute('test-data');
  if (!boardTestDataString) throw new Error('No board test data.');
  return JSON.parse(boardTestDataString) as BoardTestData;
}
