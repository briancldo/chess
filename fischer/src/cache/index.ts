type isActive = boolean;
interface ConnectionIds {
  [id: string]: isActive;
}

const connectionIds: ConnectionIds = {};

export function addConnectionId(id: string) {
  // eslint-disable-next-line security/detect-object-injection
  connectionIds[id] = true;
}

export function removeConnectionId(id: string) {
  // eslint-disable-next-line security/detect-object-injection
  delete connectionIds[id];
}
