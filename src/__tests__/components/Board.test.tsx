import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { v4 as uuidv4 } from 'uuid';

import Board from '../../components/Board/Board/Board';
import initBoard from '../../utils/board/board.init';
import {
  getSquareMetadata,
  shouldSquareBeLight,
} from '../__utils__/squareInteraction';
import {
  createBoard,
  createConcisePosition,
  PiecePlacements,
} from '../../utils/board/boardEditor';
import data, { coordinates, emptyBoardHandlers } from './support/Board.data';
import { Piece, PieceString } from '../../utils/pieces.types';
import { Coordinate } from '../../utils/board/board.types';
import { pieceObjectToString } from '../../utils/pieces';
import { renderEmptyBoard } from '../__utils__/board.utils';

describe('#Board', () => {
  describe('render', () => {
    test('square have correct, alternating colors', () => {
      const board = createBoard({ position: createConcisePosition({}) });
      render(<Board initialBoard={board} handlers={emptyBoardHandlers} />);

      for (const coordinate of coordinates) {
        const squareMetadata = getSquareMetadata(coordinate);
        expect(squareMetadata.light).toBe(shouldSquareBeLight(coordinate));
      }
    });

    test('empty board contains no pieces', () => {
      const board = createBoard({ position: createConcisePosition({}) });
      render(<Board initialBoard={board} handlers={emptyBoardHandlers} />);

      for (const coordinate of coordinates) {
        const squareMetadata = getSquareMetadata(coordinate);
        expect(squareMetadata.containingPiece).toBeUndefined();
      }
    });

    test('correctly renders pieces', () => {
      const { rerender } = renderEmptyBoard();
      const concisePositions = data.pieceRenderConcisePositions as PiecePlacements[];

      for (const concisePosition of concisePositions) {
        const position = createConcisePosition(concisePosition);
        const board = createBoard({ position });
        rerender(
          <Board
            key={uuidv4()}
            initialBoard={board}
            handlers={emptyBoardHandlers}
          />
        );

        let emptyCoordinates = [...coordinates];
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

    // test('renders square highlight when piece is clicked', () => {
    //   const  = data.squareHighlightData;
    //   const board = createBoard({ position });
    // });
  });
});
