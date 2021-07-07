import create from 'zustand';

type Username = string | null;

interface UserStore {
  username: Username;
  login: (username: Username) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const useStore = create<UserStore>((set, get) => ({
  username: null,
  login: (username) => set({ username }),
  logout: () => set({ username: null }),
  isLoggedIn: () => !!get().username,
}));

export default useStore;
