type isActive = boolean;
interface ConnectionIds {
  [id: string]: isActive;
}

const connectionIds: ConnectionIds = {};

export function addConnectionId(id: string) {
  connectionIds[id] = true;
}

export function removeConnectionId(id: string) {
  delete connectionIds[id];
}

export function isConnectionActive(id: string) {
  return connectionIds[id] === true;
}
