import '@testing-library/jest-dom/extend-expect';
import { Coordinate } from '../../utils/board/board.types';
import {
  assertCandidateMoves,
  BoardAndMoves,
} from '../pieces/common.test.utils';

import * as data from './support/checks.data';

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
