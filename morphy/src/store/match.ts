import create from 'zustand';
import { persist } from 'zustand/middleware';

import { APP_NAME } from '../utils/constants/app.constants';
import { MatchStore } from './types/match';

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
export * from './types/match';
