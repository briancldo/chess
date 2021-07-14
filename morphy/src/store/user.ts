import create from 'zustand';
import { persist } from 'zustand/middleware';

export type Username = string | null;

interface UserStore {
  username: Username;
  isLoggedIn: boolean;
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
      name: 'chessapp-user',
    }
  )
);

export default useUserStore;
