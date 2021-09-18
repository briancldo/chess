import React from 'react';

import useMatchStore from '../store/match';

const MatchPage: React.FC = () => {
  const matchId = useMatchStore((state) => state.matchId);
  const opponent = useMatchStore((state) => state.opponent);

  if (!matchId) return <h1>You are not in a match.</h1>;
  return (
    <>
      <h1>Match id: {matchId}</h1>
      <br />
      <h2>Opponent: {opponent.username}</h2>
    </>
  );
};

export default MatchPage;
