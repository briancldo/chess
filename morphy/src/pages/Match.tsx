import React from 'react';

import GameView from '../components/Game/GameView';
import { BoardDirection } from '../components/Game/GameView.types';
import useMatchStore, { MatchGameDetailsSides } from '../store/match';
import initialBoard from '../utils/board/board.init';
import { Username } from '../store/user';

const MatchPage: React.FC = () => {
  const matchId = useMatchStore((state) => state.matchId);
  const opponent = useMatchStore((state) => state.opponent);
  const sides = useMatchStore((state) => state.gameDetails?.sides);
  const direction = getBoardDirectionFromSides(
    sides || {},
    opponent?.username || ''
  );

  if (!matchId) return <h1>You are not in a match.</h1>;
  return (
    <>
      <div>
        <h1>Match id: {matchId}</h1>
        <br />
        <h2>Opponent: {opponent?.username}</h2>
        <br />
        <h2>
          Sides:: White: {sides?.white}, black: {sides?.black}
        </h2>
      </div>
      <GameView {...{ initialBoard, direction }} />
    </>
  );
};

export default MatchPage;

function getBoardDirectionFromSides(
  sides: MatchGameDetailsSides,
  opponent: Username
): BoardDirection {
  if (sides.white === opponent) return -1;
  return 1;
}
