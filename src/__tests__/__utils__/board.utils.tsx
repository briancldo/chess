import React from 'react';
import { render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import {
  createBoard,
  createFromConcisePosition,
} from '../../utils/board/boardEditor';
import { emptyBoardHandlers } from '../components/support/Board.data';

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
