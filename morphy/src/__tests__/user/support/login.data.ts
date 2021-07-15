import { UserState } from '../../../store/user';

export const preLoginState: UserState = {
  username: null,
  isLoggedIn: false,
};

export const loginState: UserState = {
  username: 'brido',
  isLoggedIn: true,
};
