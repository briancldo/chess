import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import {
  clickSquare,
  getSquareMetadata,
  shouldSquareBeLight,
} from '../__utils__/squareInteraction';
import {
  createBoard,
  createFromConcisePosition,
  PiecePlacements,
} from '../../utils/board/boardEditor';
import data, { allCoordinates, emptyBoardHandlers } from './support/Board.data';
import { Piece, PieceString } from '../../utils/pieces.types';
import { Coordinate } from '../../utils/board/board.types';
import { pieceObjectToString } from '../../utils/pieces';
import { renderEmptyBoard } from '../__utils__/board.utils';

describe('#Board', () => {
  describe('render', () => {
    test('square have correct, alternating colors', () => {
      renderEmptyBoard();

      for (const coordinate of allCoordinates) {
        const squareMetadata = getSquareMetadata(coordinate);
        expect(squareMetadata.light).toBe(shouldSquareBeLight(coordinate));
      }
    });

    test('empty board contains no pieces', () => {
      renderEmptyBoard();

      for (const coordinate of allCoordinates) {
        const squareMetadata = getSquareMetadata(coordinate);
        expect(squareMetadata.containingPiece).toBeUndefined();
      }
    });

    test('correctly renders pieces', () => {
      const { rerender } = renderEmptyBoard();
      const concisePositions = data.pieceRenderConcisePositions as PiecePlacements[];

      for (const concisePosition of concisePositions) {
        const position = createFromConcisePosition(concisePosition);
        const board = createBoard({ position });
        rerender(
          <Board
            key={uuidv4()}
            initialBoard={board}
            handlers={emptyBoardHandlers}
          />
        );

        let emptyCoordinates = [...allCoordinates];
        for (const pieceString in concisePosition) {
          const coordinates = concisePosition[
            pieceString as PieceString
          ] as Coordinate[];
          const squaresMetadata = coordinates.map((coordinate: Coordinate) =>
            getSquareMetadata(coordinate)
          );

          for (const squareMetadata of squaresMetadata) {
            const containingPiece = squareMetadata.containingPiece;
            expect(containingPiece).not.toBeUndefined();
            const containingPieceString = pieceObjectToString(
              containingPiece as Piece
            );
            expect(containingPieceString).toBe(pieceString);
          }
          emptyCoordinates = emptyCoordinates.filter(
            (coordinate) => !coordinates.includes(coordinate)
          );
        }

        for (const emptyCoordinate of emptyCoordinates) {
          const squareMetadata = getSquareMetadata(emptyCoordinate);
          expect(squareMetadata.containingPiece).toBeUndefined();
        }
      }
    });

    test('renders square highlight when piece is clicked', () => {
      const { concisePosition, highlightSquares } = data.squareHighlightData;
      const { rerender } = renderEmptyBoard();

      let nonHighlightCoordinates = [...allCoordinates];
      const board = createBoard({
        position: createFromConcisePosition(concisePosition),
      });
      rerender(
        <Board
          key={uuidv4()}
          initialBoard={board}
          handlers={emptyBoardHandlers}
        />
      );
      const squareToClick = Object.values(concisePosition).pop() as Coordinate;
      clickSquare(squareToClick);

      for (const highlightSquare of highlightSquares) {
        const squareMetadata = getSquareMetadata(highlightSquare);
        expect(squareMetadata.highlighted).toBe(true);
      }

      nonHighlightCoordinates = nonHighlightCoordinates.filter(
        (coordinate) => !highlightSquares.includes(coordinate)
      );

      for (const nonHighlightCoordinate of nonHighlightCoordinates) {
        const squareMetadata = getSquareMetadata(nonHighlightCoordinate);
        expect(squareMetadata.highlighted).toBe(false);
      }
    });
  });
});
