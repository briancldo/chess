import { InitializationError } from '../utils/errors';
import * as connectionCache from './connection';

interface UserInfo {
  connectionId: string;
}

interface UserCache {
  [username: string]: UserInfo;
}

const userCache: UserCache = {};

function doesUserExist(username: string) {
  if (userCache[username] == undefined) return false;
  return true;
}

function validateUserInfo(username: string, userInfo: UserInfo) {
  // check connection id before username matters
  const { connectionId } = userInfo;
  if (connectionCache.isConnectionActive(connectionId))
    throw new InitializationError('connection-id-taken');

  if (doesUserExist(username)) throw new InitializationError('username-taken');
}

export function addUser(username: string, userInfo: UserInfo) {
  validateUserInfo(username, userInfo);

  connectionCache.addConnectionId(userInfo.connectionId, {
    username,
    id: userInfo.connectionId,
  });
  userCache[username] = userInfo;
}

export function getUser(username: string) {
  return userCache[username];
}

export function removeUser(username: string) {
  const userInfo = userCache[username];
  if (!userInfo) return;

  const { connectionId } = userInfo;
  connectionCache.removeConnectionId(connectionId);
  delete userCache[username];
}

export function removeUserByConnectionId(connectionId: string) {
  const connectionInfo = connectionCache.getConnectionInfo(connectionId);
  if (!connectionInfo) return;

  const { username } = connectionInfo;
  removeUser(username);
}
