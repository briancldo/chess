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

describe('#knight.moves', () => {
  beforeEach(() => {
    expect.hasAssertions();
  });

  test('pure knight moves', () => {
    const { rerender } = renderEmptyBoard();

    console.log(
      JSON.stringify(
        data.happyPositionsAndMoves.map((e) => e.board.state),
        null,
        2
      )
    );
    for (const {
      board,
      testPieceSquare,
      expectedMoves,
    } of data.happyPositionsAndMoves) {
      rerender(
        <Board
          key={uuidv4()}
          initialBoard={board}
          handlers={emptyBoardHandlers}
        />
      );
      clickSquare(testPieceSquare);

      for (const coordinate of allCoordinates) {
        const shouldBeHighlighted = expectedMoves.includes(coordinate);
        const squareMetadata = getSquareMetadata(coordinate);
        expect(squareMetadata.highlighted).toBe(shouldBeHighlighted);
      }
    }
  });
});
