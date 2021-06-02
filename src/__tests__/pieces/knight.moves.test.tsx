import '@testing-library/jest-dom/extend-expect';

import * as data from './support/knight.moves.data';
import { assertCandidateMoves } from './common.test.utils';

describe('#knight.moves', () => {
  test('pure knight moves', () => {
    assertCandidateMoves(data.happyPositionsAndMoves);
  });

  test('cannot move to ally piece square, can move to enemy piece square', () => {
    assertCandidateMoves(data.otherPieceOccupyPositionsAndMoves);
  });

  test('cannot move to squares off side of board', () => {
    assertCandidateMoves(data.offsideMoves);
  });

  test('can hop over other pieces', () => {
    assertCandidateMoves(data.hopOverOthersPositionAndMoves);
  });
});
