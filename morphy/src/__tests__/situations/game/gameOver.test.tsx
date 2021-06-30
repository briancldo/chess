import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';

import GameView from '../../../components/Game/GameView';
import { makeMoves } from '../../__utils__/squareInteraction';
import { assertGameOverSituation } from './gameOver.test.utils';
import * as data from '../support/gameOver.data';

describe('game over', () => {
  test('by checkmate', () => {
    for (const setupData of data.checkmate) {
      render(<GameView initialBoard={setupData.initialBoard} />);
      makeMoves(setupData.moves);
      assertGameOverSituation({ resultText: setupData.resultText });
      cleanup();
    }
  });

  test('by stalemate', () => {
    for (const setupData of data.stalemate) {
      render(<GameView initialBoard={setupData.initialBoard} />);
      makeMoves(setupData.moves);
      assertGameOverSituation({ resultText: setupData.resultText });
      cleanup();
    }
  });
});
