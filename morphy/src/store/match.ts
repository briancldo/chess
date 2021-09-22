import create from 'zustand';
import { persist } from 'zustand/middleware';
import { APP_NAME } from '../utils/constants/app.constants';
import { DeepPartial } from '../utils/object.types';
import { Username } from './user';

export interface MatchState {
  matchId: string;
  opponent: {
    username: string;
  };
  gameDetails: {
    sides: {
      white: Username;
      black: Username;
    };
  };
}
interface MatchStore extends DeepPartial<MatchState> {
  setMatch: (matchInfo: MatchState) => void;
}

const useMatchStore = create<MatchStore>(
  persist(
    (set) => ({
      matchId: undefined,
      opponent: {
        username: undefined,
      },
      gameDetails: {
        sides: {
          white: undefined,
          black: undefined,
        },
      },
      setMatch: (info) => set(info),
    }),
    { name: `${APP_NAME}-match` }
  )
);

export default useMatchStore;
