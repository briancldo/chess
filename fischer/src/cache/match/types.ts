import { UserId } from '../user/types';

export interface MatchDetails {
  players: [UserId, UserId];
}
