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
  rejected: 'rejected',
  userNotFound: 'User not found',
} as const;
socket.on('challenge_response', (response: keyof typeof challengeResponses) => {
  alert(challengeResponses[response]);
});
