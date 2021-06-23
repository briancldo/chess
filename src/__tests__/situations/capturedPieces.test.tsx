import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { v4 as uuidv4 } from 'uuid';

import { renderEmptyBoard } from '../__utils__/board.utils';
import GameView from '../../components/Game/GameView';
import * as data from './support/capturedPieces.data';
import { makeMove } from '../__utils__/squareInteraction';
import {
  createCapturedPiecesAggregation,
  getCapturedPieces,
} from '../__utils__/game.utils';

describe('capturedPieces', () => {
  test('displays correct pieces (does not test order)', () => {
    const { rerender } = renderEmptyBoard();

    for (const { board, movesAndAssertions } of data.displaysCorrectPieces) {
      rerender(<GameView key={uuidv4()} initialBoard={board} />);

      for (const { move, expectedCapturedPieces } of movesAndAssertions) {
        makeMove(move.origin, move.destination);
        const aggCapturedPieces = createCapturedPiecesAggregation(
          getCapturedPieces()
        );
        const aggExpectedCapturedPieces = createCapturedPiecesAggregation(
          expectedCapturedPieces
        );
        expect(aggCapturedPieces).toEqual(aggExpectedCapturedPieces);
      }
    }
  });

  test.todo('pieces are sorted');

  test.todo('no captures means captured list does not change');

  test.todo('captured promoted piece counts as pawn');

  test.todo('captured list reset on new game');

  // edge case
  test.todo('capture on promotion');
});
