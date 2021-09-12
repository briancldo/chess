import React from 'react';
import { challengeUser } from '../../backend/ws/challenge';
import Button from '../ui/Button';

const ChallengeButton: React.FC = () => {
  function promptChallenge() {
    const targetUsername = prompt('Enter username to challenge');
    if (targetUsername == null) return;

    challengeUser(targetUsername);
  }

  return <Button onClick={promptChallenge}>Challenge</Button>;
};

export default ChallengeButton;
