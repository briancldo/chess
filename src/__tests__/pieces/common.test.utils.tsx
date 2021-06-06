import React from 'react';
import { cleanup } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { Draft, produce } from 'immer';

import Board from '../../components/Board/Board/Board';
import {
  Board as BoardType,
  BoardFullRank,
  BoardPosition,
  BoardSquare,
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
  makeMove,
  makeMoves,
  MoveCoordinates,
} from '../__utils__/squareInteraction';
import { coordinateToSquare } from '../../utils/board/board';
import { Piece } from '../../utils/pieces.types';

export interface BoardAndMoves {
  board: BoardType;
  preTestMoves?: MoveCoordinates[];
  testPieceSquare: Coordinate;
  expectedMoves: Coordinate[];
}

export function assertCandidateMoves(positionsAndMoves: BoardAndMoves[]) {
  const { rerender } = renderEmptyBoard();

  for (const {
    board,
    preTestMoves,
    testPieceSquare,
    expectedMoves,
  } of positionsAndMoves) {
    rerender(
      <Board
        key={uuidv4()}
        initialBoard={board}
        handlers={emptyBoardHandlers}
      />
    );
    if (preTestMoves) makeMoves(preTestMoves);
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

  for (const {
    board,
    preTestMoves,
    testPieceSquare,
    expectedMoves,
  } of positionsAndMoves) {
    for (const destination of expectedMoves) {
      rerender(
        <Board
          key={uuidv4()}
          initialBoard={board}
          handlers={emptyBoardHandlers}
        />
      );
      if (preTestMoves) makeMoves(preTestMoves);
      makeMove(testPieceSquare, destination);

      const { board: simulatedBoard } = getBoardTestData();
      const actualPosition = simulatedBoard.position;
      const expectedPosition = getPositionAfterMoves(board.position, [
        ...(preTestMoves ?? []),
        {
          origin: testPieceSquare,
          destination,
        },
      ]);
      expect(expectedPosition).toEqual(actualPosition);
    }
  }

  cleanup();
}

function getPositionAfterMoves(
  position: BoardPosition,
  movesCoordinates: MoveCoordinates[]
) {
  let newPosition = position;
  for (const move of movesCoordinates) {
    newPosition = getPositionAfterMove(newPosition, move);
  }
  return newPosition;
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
    handleEnPassant(
      draft,
      { file: originFile, rank: originRank },
      { file: destFile, rank: destRank }
    );
    delete draft[originRank][originFile];
    draft[destRank][destFile] = piece;
  });
}

function handleEnPassant(
  draft: Draft<BoardPosition>,
  originSquare: BoardSquare,
  destSquare: BoardSquare
) {
  const originPiece = draft[originSquare.rank][originSquare.file];
  if (!originPiece || originPiece.type !== 'p') return;
  if (originSquare.file === destSquare.file) return;

  const destPiece = draft[destSquare.rank][destSquare.file];
  if (destPiece) return;

  const originPieceColor = originPiece.color;
  const offset = originPieceColor === 'w' ? -1 : 1;
  delete (draft[destSquare.rank + offset] as BoardFullRank)[destSquare.file];
}
