import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import GameView from '../../components/Game/GameView';
import * as data from './support/capturedPieces.data';
import { makeMove, makeMoves } from '../__utils__/squareInteraction';
import {
  createCapturedPiecesAggregation,
  getCapturedPieces,
  startNewGame,
} from '../__utils__/game.utils';

describe('capturedPieces', () => {
  test('displays correct pieces (does not test order)', () => {
    const { rerender } = render(<GameView />);

    for (const { board, movesAndAssertions } of data.displaysCorrectPieces) {
      rerender(<GameView key={uuidv4()} initialBoard={board} />);

      for (const { move, expectedCapturedPieces } of movesAndAssertions) {
        makeMove(move);
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

  test('pieces are sorted', () => {
    assertCaptures(data.displaysCorrectPieces);
  });

  test('no captures means captured list does not change', () => {
    assertCaptures(data.noCaptures);
  });

  test('captured promoted piece counts as pawn', () => {
    assertCaptures(data.capturePromoted);
  });

  test('captured list resets on new game', () => {
    render(<GameView initialBoard={data.gameOverMoves.board} />);

    makeMoves(data.gameOverMoves.moves);
    startNewGame();
    const capturedPieces = getCapturedPieces();
    expect(capturedPieces).toEqual({ w: [], b: [] });
  });

  // edge case
  test('counts capture correctly on promotion move', () => {
    assertCaptures(data.capturePromoted);
  });
});

function assertCaptures(data: data.CapturedPiecesData[]) {
  const { rerender } = render(<GameView />);

  for (const { board, movesAndAssertions } of data) {
    rerender(<GameView key={uuidv4()} initialBoard={board} />);

    for (const { move, expectedCapturedPieces } of movesAndAssertions) {
      makeMove(move);
      const capturedPieces = getCapturedPieces();
      expect(capturedPieces).toEqual(expectedCapturedPieces);
    }
  }
}
