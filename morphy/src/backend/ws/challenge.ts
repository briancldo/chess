import useMatchStore, { MatchInfo } from '../../store/match';
import { socket } from './instance';

export function challengeUser(username: string) {
  socket.emit('challenge_request', username);
}

socket.on('challenge_request', (username: string) => {
  const accepted = confirm(`${username} challenges you to a match! Accept?`);
  socket.emit('challenge_response', { challenger: username, accepted });
});

const challengeResponses = {
  accepted: 'accepted',
  rejected: 'Challenge declined.',
  userNotFound: 'User not found.',
} as const;
type ChallengeResponseCodes = keyof typeof challengeResponses;
socket.on(
  'challenge_response',
  (code: ChallengeResponseCodes, matchInfo: MatchInfo) => {
    if (code !== challengeResponses.accepted)
      return informChallengeFailure(code);

    useMatchStore.getState().setMatch(matchInfo);
  }
);

function informChallengeFailure(
  code: Exclude<ChallengeResponseCodes, 'accepted'>
) {
  alert(challengeResponses[code]);
}
