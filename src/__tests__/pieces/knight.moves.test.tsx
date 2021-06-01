import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import { createBoard } from '../../utils/board/boardEditor';
import data from './support/knight.moves.data';
import {
  allCoordinates,
  emptyBoardHandlers,
} from '../components/support/Board.data';
import { renderEmptyBoard } from '../__utils__/board.utils';
import { clickSquare, getSquareMetadata } from '../__utils__/squareInteraction';
import { assertCorrectMoves } from './common.test.utils';

describe('#knight.moves', () => {
  beforeEach(() => {
    expect.hasAssertions();
  });

  test('pure knight moves', () => {
    assertCorrectMoves(data.happyPositionsAndMoves);
  });
});
