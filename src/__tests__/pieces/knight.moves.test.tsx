import '@testing-library/jest-dom/extend-expect';

import * as data from './support/knight.moves.data';
import { assertCorrectMoves } from './common.test.utils';

describe('#knight.moves', () => {
  beforeEach(() => {
    expect.hasAssertions();
  });

  test('pure knight moves', () => {
    assertCorrectMoves(data.happyPositionsAndMoves);
  });

  test('cannot move to ally piece square, can move to enemy piece square', () => {
    assertCorrectMoves(data.otherPieceOccupyPositionsAndMoves);
  });

  test('cannot move to squares off side of board', () => {
    assertCorrectMoves(data.offsideMoves);
  });

  test('can hop over other pieces', () => {
    assertCorrectMoves(data.hopOverOthersPositionAndMoves);
  });
});
