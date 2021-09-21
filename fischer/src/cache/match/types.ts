import { UserId } from '../user/types';

export interface MatchGameSideDetails {
  white: UserId;
  black: UserId;
}

interface MatchGameDetails {
  sides: MatchGameSideDetails;
}

export interface MatchDetails {
  players: [UserId, UserId];
  gameDetails: MatchGameDetails;
}
