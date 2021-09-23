import { routeMapping } from '../../pages/utils/routes';
import useMatchStore, { MatchState } from '../../store/match';
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
  userInMatch: 'User is currently in a match.',
} as const;
type ChallengeResponseCodes = keyof typeof challengeResponses;
socket.on(
  'challenge_response',
  (code: ChallengeResponseCodes, matchInfo: MatchState) => {
    if (code !== challengeResponses.accepted)
      return informChallengeFailure(code);

    useMatchStore.getState().setMatch(matchInfo);
    window.location.href = routeMapping.match;
  }
);

function informChallengeFailure(
  code: Exclude<ChallengeResponseCodes, 'accepted'>
) {
  alert(challengeResponses[code]);
}
