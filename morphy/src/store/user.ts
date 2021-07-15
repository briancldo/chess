import create from 'zustand';
import { persist } from 'zustand/middleware';
import { APP_NAME } from '../utils/constants/app.constants';

export type Username = string | null;

export interface UserState {
  username: Username;
  isLoggedIn: boolean;
}

interface UserStore extends UserState {
  login: (username: Username) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      username: null,
      isLoggedIn: false,
      login: (username) => set({ username, isLoggedIn: true }),
      logout: () => set({ username: null, isLoggedIn: false }),
    }),
    {
      name: `${APP_NAME}-user`,
    }
  )
);

export default useUserStore;
