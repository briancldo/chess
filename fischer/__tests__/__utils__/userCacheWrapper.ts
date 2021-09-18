import { nameCache } from '../../src/cache/user/instance';
import userCache from '../../src/cache/user';

function connectionIdToUsername(connectionId: string) {
  for (const username of nameCache.keys()) {
    const user = userCache.getByUsername(username);
    if (user?.connectionId === connectionId) return username;
  }
  return undefined;
}

export default {
  ...userCache,
  connectionIdToUsername,
};
