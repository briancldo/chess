import '@testing-library/jest-dom/extend-expect';
import { Coordinate } from '../../utils/board/board.types';
import {
  createBoard,
  createFromConcisePosition,
} from '../../utils/board/boardEditor';
import { PieceColor } from '../../utils/pieces.types';
import {
  assertCandidateMoves,
  assertMadeMoves,
  BoardAndMoves,
} from './common.test.utils';

import * as data from './support/pawn.moves.data';

describe('#pawn.moves', () => {
  describe('candidate moves', () => {
    test('move one or two squares on first move', () => {
      assertCandidateMoves(data.firstMovePositionsAndMoves);
    });

    test('moves one space otherwise', () => {
      const sides: PieceColor[] = ['w', 'b'];
      for (const color of sides) {
        for (const coordinate of data.oneSquareForwardCoordinates) {
          const boardAndMoves: BoardAndMoves = {
            board: createBoard({
              position: { [`${color}p`]: [coordinate] },
              state: { turn: color },
            }),
            testPieceSquare: coordinate,
            expectedMoves: [getOneCoordinateForward(coordinate, color)],
          };
          assertCandidateMoves([boardAndMoves]);
        }
      }
    });

    test('range blocked by other pieces', () => {
      assertCandidateMoves(data.rangeBlockedPositionsAndMoves);
    });

    test('en passant', () => {
      assertCandidateMoves(data.enPassantPositionAndMoves);
    });
  });

  describe('actual moves', () => {
    test('move one or two squares on first move', () => {
      assertMadeMoves(data.firstMovePositionsAndMoves);
    });

    test('moves one space otherwise', () => {
      const sides: PieceColor[] = ['w', 'b'];
      for (const color of sides) {
        for (const coordinate of data.oneSquareForwardCoordinates) {
          const boardAndMoves: BoardAndMoves = {
            board: createBoard({
              position: { [`${color}p`]: [coordinate] },
              state: { turn: color },
            }),
            testPieceSquare: coordinate,
            expectedMoves: [getOneCoordinateForward(coordinate, color)],
          };
          assertMadeMoves([boardAndMoves]);
        }
      }
    });

    test('range blocked by other pieces', () => {
      assertMadeMoves(data.rangeBlockedPositionsAndMoves);
    });

    test('en passant', () => {
      assertMadeMoves(data.enPassantPositionAndMoves);
    });
  });
});

function getOneCoordinateForward(coordinate: Coordinate, color: PieceColor) {
  const [file, rankString] = coordinate.split('') as [string, string];
  const rankNumber = Number.parseInt(rankString);
  const offset = color === 'w' ? 1 : -1;
  return `${file}${rankNumber + offset}` as Coordinate;
}
