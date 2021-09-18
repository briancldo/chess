// eslint-disable-next-line node/no-unpublished-import
import { Socket } from 'socket.io-client';

import { io } from '../../src/app';
import * as socketUtils from '../__utils__/socket.test.utils';
import userCache from '../__utils__/userCacheWrapper';
import matchCache from '../../src/cache/match';

describe('challenge', () => {
  afterEach(async () => {
    await socketUtils.logoutAll();
  });

  afterAll(() => {
    io.close();
  });

  test('accepted -> room & user caches correctly updated', async () => {
    const magnusSocket = await socketUtils.connect({ username: 'magnus' });
    await socketUtils.connect({ username: 'nepo' });
    await createAndAcceptChallenge(magnusSocket);

    const magnus = userCache.getByUsername('magnus');
    const nepo = userCache.getByUsername('nepo');
    expect(magnus?.match?.id).toBeDefined();
    expect(magnus?.match?.id).toBe(nepo?.match?.id);

    const matchId = magnus?.match?.id as string;
    const match = matchCache.get(matchId);
    expect(match).toBeDefined();
    const playerNames = match?.players.map((playerId) =>
      userCache.getUsername(playerId)
    );
    expect(playerNames?.sort()).toEqual(['magnus', 'nepo']);
  });

  test('accepted -> both players join the socket room', async () => {
    const magnusSocket = await socketUtils.connect({ username: 'magnus' });
    await socketUtils.connect({ username: 'nepo' });
    await createAndAcceptChallenge(magnusSocket);

    const matchId = userCache.getByUsername('magnus')?.match?.id as string;
    expect(matchId).toBeDefined();
    const playersInMatch = (await io.in(matchId).fetchSockets()).map((socket) =>
      userCache.connectionIdToUsername(socket.id)
    );
    expect(playersInMatch.sort()).toEqual(['magnus', 'nepo']);
  });
});

// NOTE: will need refactoring once challenge_response requires a challenge_request
async function createAndAcceptChallenge(challengeeSocket: Socket) {
  await new Promise<void>((resolve) => {
    challengeeSocket.on('challenge_response', resolve);

    // skipping challenge request - magnus accepts a phantom challenge
    challengeeSocket.emit('challenge_response', {
      challenger: 'nepo',
      accepted: true,
    });
  });
}
