import { connect } from '../../../backend/ws/connection';
import useUserStore, { Username } from '../../../store/user';

interface LoginDetails {
  username: Username;
}

export function login(loginDetails: LoginDetails) {
  const { username } = loginDetails;
  const storeLogin = useUserStore.getState().login;

  connect();
  storeLogin(username);
}
