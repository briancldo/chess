import create from 'zustand';

type Username = string | null;

interface UserStore {
  username: Username;
  isLoggedIn: boolean;
  login: (username: Username) => void;
  logout: () => void;
}

const useStore = create<UserStore>((set) => ({
  username: null,
  isLoggedIn: false,
  login: (username) => set({ username, isLoggedIn: true }),
  logout: () => set({ username: null, isLoggedIn: false }),
}));

export default useStore;
