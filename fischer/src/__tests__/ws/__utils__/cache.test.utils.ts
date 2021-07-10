import { isConnectionActive } from '../../../cache';

export function isConnectionIdCached(id: string) {
  return isConnectionActive(id);
}
