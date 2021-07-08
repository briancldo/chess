import useUserStore, { Username } from '../../../store/user';

interface LoginDetails {
  username: Username;
}

export function login(loginDetails: LoginDetails) {
  const { username } = loginDetails;
  const storeLogin = useUserStore.getState().login;

  // TODO: connect to websocket

  storeLogin(username);
}
