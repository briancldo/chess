import React from 'react';

import GameView from '../components/Game/GameView';
import { BoardDirection } from '../components/Game/GameView.types';
import useMatchStore, { MatchGameDetailsSides } from '../store/match';
import initialBoard from '../utils/board/board.init';
import { Username } from '../store/user';

const MatchPage: React.FC = () => {
  const matchId = useMatchStore((state) => state.matchId);
  const opponent = useMatchStore((state) => state.opponent);
  const gameDetails = useMatchStore((state) => state.gameDetails);
  const sides = gameDetails?.sides;
  const direction = getBoardDirectionFromSides(
    sides || {},
    opponent?.username || ''
  );

  if (!matchId) return <h1>You are not in a match.</h1>;
  return <GameView {...{ initialBoard, direction, gameDetails }} />;
};

export default MatchPage;

function getBoardDirectionFromSides(
  sides: MatchGameDetailsSides,
  opponent: Username
): BoardDirection {
  if (sides.white === opponent) return -1;
  return 1;
}
