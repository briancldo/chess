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

  test('sides are assigned', async () => {
    const magnusSocket = await socketUtils.connect({ username: 'magnus' });
    await socketUtils.connect({ username: 'nepo' });
    await createAndAcceptChallenge(magnusSocket);

    const magnusId = userCache.getId('magnus');
    const nepoId = userCache.getId('nepo');
    const matchId = userCache.getByUsername('magnus')?.match?.id as string;
    expect(matchCache.get(matchId)?.gameDetails.sides).toEqual({
      white: expect.stringMatching(`(${magnusId})|(${nepoId})`),
      black: expect.stringMatching(`(${magnusId})|(${nepoId})`),
    });
  });

  test('sides are randomized', async () => {
    const floorSpy = jest.spyOn(Math, 'floor');

    // create + accept match - magnus is white, nepo is black
    let magnusSocket = await socketUtils.connect({ username: 'magnus' });
    await socketUtils.connect({ username: 'nepo' });
    floorSpy.mockReturnValueOnce(0);
    await createAndAcceptChallenge(magnusSocket);

    let magnusId = userCache.getId('magnus');
    let nepoId = userCache.getId('nepo');
    let matchId = userCache.getByUsername('magnus')?.match?.id as string;
    let match = matchCache.get(matchId);

    expect(match?.gameDetails.sides.white).toBe(magnusId);
    expect(match?.gameDetails.sides.black).toBe(nepoId);

    // resetting data - doing it all over
    await socketUtils.logoutAll();
    userCache.clear();
    matchCache.clear();

    // create + accept match - nepo is white, magnus is black
    magnusSocket = await socketUtils.connect({ username: 'magnus' });
    await socketUtils.connect({ username: 'nepo' });
    floorSpy.mockReturnValueOnce(1);
    await createAndAcceptChallenge(magnusSocket);

    magnusId = userCache.getId('magnus');
    nepoId = userCache.getId('nepo');
    matchId = userCache.getByUsername('magnus')?.match?.id as string;
    match = matchCache.get(matchId);

    expect(match?.gameDetails.sides.white).toBe(nepoId);
    expect(match?.gameDetails.sides.black).toBe(magnusId);
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
