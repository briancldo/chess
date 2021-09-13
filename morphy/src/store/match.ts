import create from 'zustand';
import { persist } from 'zustand/middleware';
import { APP_NAME } from '../utils/constants/app.constants';

type MatchState = {
  matchId?: string;
  opponent: {
    username?: string;
  };
};

interface MatchInfo {
  matchId: string;
  opponent: {
    username: string;
  };
}
interface MatchStore extends MatchState {
  setMatch: (matchInfo: MatchInfo) => void;
}

const useMatchStore = create<MatchStore>(
  persist(
    (set) => ({
      matchId: undefined,
      opponent: {
        username: undefined,
      },
      setMatch: (info) => set(info),
    }),
    { name: `${APP_NAME}-match` }
  )
);

export default useMatchStore;
