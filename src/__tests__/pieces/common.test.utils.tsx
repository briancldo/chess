import React from 'react';
import { cleanup } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';

import Board from '../../components/Board/Board/Board';
import {
  Board as BoardType,
  BoardPosition,
  Coordinate,
} from '../../utils/board/board.types';
import {
  allCoordinates,
  emptyBoardHandlers,
} from '../components/support/Board.data';
import { getBoardTestData, renderEmptyBoard } from '../__utils__/board.utils';
import {
  clickSquare,
  getSquareMetadata,
  movePiece,
} from '../__utils__/squareInteraction';
import { coordinateToSquare } from '../../utils/board/board';

export interface BoardAndMoves {
  board: BoardType;
  testPieceSquare: Coordinate;
  expectedMoves: Coordinate[];
}
interface MoveCoordinates {
  origin: Coordinate;
  destination: Coordinate;
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

  cleanup();
}

export function assertMadeMoves(positionsAndMoves: BoardAndMoves[]) {
  const { rerender } = renderEmptyBoard();

  for (const { board, testPieceSquare, expectedMoves } of positionsAndMoves) {
    for (const destination of expectedMoves) {
      rerender(
        <Board
          key={uuidv4()}
          initialBoard={board}
          handlers={emptyBoardHandlers}
        />
      );
      movePiece(testPieceSquare, destination);

      const { board: simulatedBoard } = getBoardTestData();
      const expectedPosition = simulatedBoard.position;
      const actualPosition = getPositionAfterMove(board.position, {
        origin: testPieceSquare,
        destination,
      });
      expect(actualPosition).toEqual(expectedPosition);
    }
  }

  cleanup();
}

function getPositionAfterMove(
  position: BoardPosition,
  moveCoordinates: MoveCoordinates
): BoardPosition {
  const { origin, destination } = moveCoordinates;
  const { file: originFile, rank: originRank } = coordinateToSquare(origin);
  const { file: destFile, rank: destRank } = coordinateToSquare(destination);
  const piece = position[originRank][originFile];
  if (!piece) throw new Error('Move piece - no piece in origin square!');

  return produce(position, (draft) => {
    delete draft[originRank][originFile];
    draft[destRank][destFile] = piece;
  });
}
