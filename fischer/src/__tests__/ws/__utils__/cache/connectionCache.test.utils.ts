import { isConnectionActive } from '../../../../cache/connection';

export function isConnectionIdCached(id: string) {
  return isConnectionActive(id);
}
