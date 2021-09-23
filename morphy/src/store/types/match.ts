import { Username } from '../user';

export interface MatchGameDetailsSides {
  white?: Username;
  black?: Username;
}

interface MatchGameDetails {
  sides?: MatchGameDetailsSides;
}

export type MatchState = {
  matchId?: string;
  opponent?: {
    username?: string;
  };
  gameDetails?: MatchGameDetails;
};

export type MatchStore = MatchState & {
  setMatch: (matchInfo: MatchState) => void;
};
