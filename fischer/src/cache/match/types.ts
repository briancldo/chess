import { UserId } from '../user/types';

export default interface MatchDetails {
  players: [UserId, UserId];
}
