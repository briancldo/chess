import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from '../../components/Board/Board/Board';
import {
  getSquareMetadata,
  shouldSquareBeLight,
} from '../__utils__/squareInteraction';
import {
  createBoard,
  createConcisePosition,
} from '../../utils/board/boardEditor';
import { coordinates, emptyBoardHandlers } from './support/Board.data';

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

    // test('renders pieces');

    // test('renders square highlight when piece is clicked');
  });
});
