import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import { Coordinate } from '../../utils/board/board.types';
import { createBoard } from '../../utils/board/editor/boardEditor';
import { PieceColor } from '../../utils/pieces.types';
import { emptyBoardHandlers } from '../components/support/Board.data';
import { getBoardTestData } from '../__utils__/board.utils';
import {
  assertCandidateMoves,
  assertMadeMoves,
  BoardAndMoves,
} from './common.test.utils';

import * as data from './support/pawn.moves.data';
import { choosePromotionPiece, makeMove } from '../__utils__/squareInteraction';

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

  describe('promotion', () => {
    test('promotes to selected piece', () => {
      for (const promotionData of data.promotion) {
        render(
          <Board
            key={uuidv4()}
            initialBoard={promotionData.board}
            handlers={emptyBoardHandlers}
          />
        );
        makeMove({
          origin: promotionData.promotingMove.origin,
          destination: promotionData.promotingMove.destination,
        });
        choosePromotionPiece(promotionData.promotingMove.promotionPiece);

        const position = getBoardTestData().board.position;
        expect(position).toEqual(promotionData.postPromotionBoard.position);
        cleanup();

        assertCandidateMoves([
          {
            board: promotionData.postPromotionBoard,
            expectedMoves: promotionData.promotedPieceMoves,
            testPieceSquare: promotionData.promotingMove.destination,
          },
        ]);
      }
    });
  });
});

function getOneCoordinateForward(coordinate: Coordinate, color: PieceColor) {
  const [file, rankString] = coordinate.split('') as [string, string];
  const rankNumber = Number.parseInt(rankString);
  const offset = color === 'w' ? 1 : -1;
  return `${file}${rankNumber + offset}` as Coordinate;
}
