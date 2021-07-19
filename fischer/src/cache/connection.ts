interface ConnectionIdInfo {
  id: string;
  username: string;
}

interface ConnectionIds {
  [id: string]: ConnectionIdInfo;
}

export const connectionIds: ConnectionIds = {};

export function addConnectionId(id: string, info: ConnectionIdInfo) {
  connectionIds[id] = info;
}

export function removeConnectionId(id: string) {
  delete connectionIds[id];
}

export function getConnectionInfo(id: string) {
  return connectionIds[id];
}

export function isConnectionActive(id: string) {
  return connectionIds[id] != undefined;
}
