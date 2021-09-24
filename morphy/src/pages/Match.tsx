import React from 'react';

import GameView from '../components/Game/GameView';
import { BoardDirection } from '../components/Game/GameView.types';
import useMatchStore, { MatchGameDetailsSides } from '../store/match';
import initialBoard from '../utils/board/board.init';
import useUserStore, { Username } from '../store/user';
import { PieceColor } from '../utils/pieces.types';

const MatchPage: React.FC = () => {
  const username = useUserStore((state) => state.username);
  const matchId = useMatchStore((state) => state.matchId);
  const opponent = useMatchStore((state) => state.opponent);
  const gameDetails = useMatchStore((state) => state.gameDetails);
  const sides = gameDetails?.sides;
  const direction = getBoardDirectionFromSides(
    sides || {},
    opponent?.username || ''
  );

  if (!matchId) return <h1>You are not in a match.</h1>;

  const color: PieceColor = sides?.white === username ? 'w' : 'b';
  return (
    <GameView
      {...{ initialBoard, direction, gameDetails, moveOnlyColor: color }}
    />
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
