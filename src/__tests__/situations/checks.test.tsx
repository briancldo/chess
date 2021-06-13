/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import { Coordinate } from '../../utils/board/board.types';
import { emptyBoardHandlers } from '../components/support/Board.data';
import {
  assertCandidateMoves,
  BoardAndMoves,
} from '../pieces/common.test.utils';
import { getBoardTestData, renderEmptyBoard } from '../__utils__/board.utils';
import { makeMoves } from '../__utils__/squareInteraction';

import * as data from './support/checks.data';
import { cleanup } from '@testing-library/react';

describe('checks', () => {
  describe('single-check handling', () => {
    test('block attacker', () => {
      for (const dataPoint of data.singleCheckBlockAttacker) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });

    test('capture attacker', () => {
      for (const dataPoint of data.singleCheckCaptureAttacker) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });

    test('move king', () => {
      for (const dataPoint of data.singleCheckKingMove) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });
  });

  describe('double-check handling', () => {
    test('only option is moving king', () => {
      for (const dataPoint of data.doubleChecks) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });
  });

  describe('pins', () => {
    test('pinned pieces cannot reveal the king', () => {
      for (const dataPoint of data.pins) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });
  });

  describe('checkmate', () => {
    test('no pieces can move', () => {
      for (const dataPoint of data.checkmate) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });

    test('state is correct', () => {
      const { rerender } = renderEmptyBoard();

      for (const dataPoint of data.checkmate) {
        if (!dataPoint.preTestMoves) throw new Error('Need preTestMoves!');
        rerender(
          <Board
            key={uuidv4()}
            initialBoard={dataPoint.board}
            handlers={emptyBoardHandlers}
          />
        );
        makeMoves(dataPoint.preTestMoves);
        const state = getBoardTestData().board.state;
        expect(state.result).toEqual({
          value: '+',
          side: state.turn === 'w' ? 'b' : 'w',
          method: 'c',
        });
      }
    });
  });

  describe('stalemate', () => {
    test('no pieces can move', () => {
      for (const dataPoint of data.stalemateNoMoves) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });

    test('not stalemate if ally pieces can move', () => {
      const { rerender } = renderEmptyBoard();

      for (const dataPoint of data.notStalemateAlliesMove) {
        if (!dataPoint.preTestMoves) throw new Error('Need preTestMoves!');
        rerender(
          <Board
            key={uuidv4()}
            initialBoard={dataPoint.board}
            handlers={emptyBoardHandlers}
          />
        );
        makeMoves(dataPoint.preTestMoves);
        const result = getBoardTestData().board.state.result;
        expect(result).toBeUndefined();
      }
      cleanup();

      for (const dataPoint of data.notStalemateAlliesMove) {
        assertCandidateMoves(transformToBoardAndMovesArray(dataPoint));
      }
    });

    test('state is correct', () => {
      const { rerender } = renderEmptyBoard();

      for (const dataPoint of data.stalemateNoMoves) {
        if (!dataPoint.preTestMoves) throw new Error('Need preTestMoves!');
        rerender(
          <Board
            key={uuidv4()}
            initialBoard={dataPoint.board}
            handlers={emptyBoardHandlers}
          />
        );
        makeMoves(dataPoint.preTestMoves);
        const result = getBoardTestData().board.state.result;
        expect(result).toEqual({
          value: '=',
          method: 's',
        });
      }
    });
  });
});

function transformToBoardAndMovesArray(
  dataPoint: data.BoardAndManyMoves
): BoardAndMoves[] {
  const boardAndMoves: BoardAndMoves[] = [];

  for (const testPieceSquare in dataPoint.expectedMovesByCoordinate) {
    boardAndMoves.push({
      board: dataPoint.board,
      preTestMoves: dataPoint.preTestMoves,
      testPieceSquare: testPieceSquare as Coordinate,
      expectedMoves: dataPoint.expectedMovesByCoordinate[
        testPieceSquare as Coordinate
      ] as Coordinate[],
    });
  }

  return boardAndMoves;
}
