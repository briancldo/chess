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
  if (!doesUserExist(username)) throw new InitializationError('username-taken');

  const { connectionId } = userInfo;
  if (!connectionCache.isConnectionActive(connectionId))
    throw new InitializationError('connection-id-taken');
}

export function addUser(username: string, userInfo: UserInfo) {
  validateUserInfo(username, userInfo);

  connectionCache.addConnectionId(userInfo.connectionId);
  userCache[username] = userInfo;
}

export function getUser(username: string) {
  return userCache[username];
}
