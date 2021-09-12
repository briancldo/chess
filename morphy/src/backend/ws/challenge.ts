import { socket } from './instance';

export function challengeUser(username: string) {
  socket.emit('challenge', username, handleChallengeResponse);
}

const challengeResponses = {
  accepted: 'accepted',
  rejected: 'rejected',
  userNotFound: 'User not found',
} as const;
function handleChallengeResponse(response: keyof typeof challengeResponses) {
  alert(challengeResponses[response]);
}
