import create from 'zustand';
import { persist } from 'zustand/middleware';
import { SessionInfo } from '../backend/ws/session';
import { APP_NAME } from '../utils/constants/app.constants';

export type Username = string | null;

export interface UserState {
  username: Username;
  userId?: string;
  sessionId?: string;
  isLoggedIn: boolean;
}

export interface UserStore extends UserState {
  login: (username: Username) => void;
  logout: () => void;
  setSessionInfo: (info: SessionInfo) => void;
}

const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      username: null,
      userId: undefined,
      sessionId: undefined,
      isLoggedIn: false,
      login: (username) => set({ username, isLoggedIn: true }),
      logout: () => set({ username: null, isLoggedIn: false }),
      setSessionInfo: (info) => set(info),
    }),
    {
      name: `${APP_NAME}-user`,
    }
  )
);

export default useUserStore;
