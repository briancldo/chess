import { connect, disconnect } from '../../../backend/ws/connection';
import useUserStore, { Username } from '../../../store/user';
import { PromptLoginOptions } from './auth.types';

interface LoginDetails {
  username: Username;
}

export async function login(loginDetails: LoginDetails) {
  const { username } = loginDetails;
  const storeLogin = useUserStore.getState().login;

  try {
    await connect(username);
    storeLogin(username);
  } catch (error) {
    alert(`Error logging in: ${error.message}`);
  }
}

export async function promptLogin(options?: PromptLoginOptions) {
  const { message = 'Select a username:' } = options || {};
  let username;
  do {
    username = prompt(message);
    if (username === null) return;
  } while (!username);
  await login({ username });
}

export function logout() {
  const storeLogout = useUserStore.getState().logout;

  disconnect();
  storeLogout();
}
