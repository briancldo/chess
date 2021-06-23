import { screen } from '@testing-library/react';

import { getBoardTestData } from '../../__utils__/board.utils';
import initialBoard from '../../../utils/board/board.init';
import { startNewGame } from '../../__utils__/game.utils';

interface GameOverContext {
  resultText: string;
}

export function assertGameOverSituation(context: GameOverContext) {
  assertResultText(context.resultText);
  assertNewGameButtonVisible();
  assertNewGameButtonClick();
}

function assertResultText(resultText: string) {
  expect(() => screen.getByRole('heading', { name: resultText })).not.toThrow();
}

function assertNewGameButtonVisible() {
  let newGameButton;
  expect(() => {
    newGameButton = screen.getByRole('button', { name: 'New Game' });
  }).not.toThrow();
  expect(newGameButton).not.toBeUndefined();
}

function assertNewGameButtonClick() {
  startNewGame();

  const board = getBoardTestData().board;
  expect(board).toEqual(initialBoard);

  expect(() => screen.getByRole('button', { name: 'New Game' })).toThrow();
}
