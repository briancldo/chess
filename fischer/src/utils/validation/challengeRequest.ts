import userCache from '../../cache/user';
import { Username } from '../../cache/user/types';

export function validateChallengee(challengee: Username, username: Username) {
  if (typeof challengee !== 'string') return 'userNotFound';
  if (challengee === username) return 'userNotFound';
  if (!userCache.existsByUsername(challengee)) return 'userNotFound';
  if (userCache.getByUsername(challengee)?.match) return 'userInMatch';

  return null;
}
