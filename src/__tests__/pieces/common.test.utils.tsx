import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Board from '../../components/Board/Board/Board';

import { Board as BoardType, Coordinate } from '../../utils/board/board.types';
import {
  allCoordinates,
  emptyBoardHandlers,
} from '../components/support/Board.data';
import { renderEmptyBoard } from '../__utils__/board.utils';
import { clickSquare, getSquareMetadata } from '../__utils__/squareInteraction';

export interface BoardAndMoves {
  board: BoardType;
  testPieceSquare: Coordinate;
  expectedMoves: Coordinate[];
}

export function assertCandidateMoves(positionsAndMoves: BoardAndMoves[]) {
  const { rerender } = renderEmptyBoard();

  for (const { board, testPieceSquare, expectedMoves } of positionsAndMoves) {
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
}
