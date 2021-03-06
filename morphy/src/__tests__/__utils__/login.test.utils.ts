import { produce } from 'immer';
import isFunction from 'lodash/isFunction';

import useUserStore, { Username, UserState, UserStore } from '../../store/user';
import { act, screen, waitFor } from '@testing-library/react';
import { APP_NAME } from '../../utils/constants/app.constants';

import { socket } from '../../backend/ws/instance';

interface TestLoginDetails {
  username: Username;
}

async function test_login_pure(loginDetails: TestLoginDetails) {
  const { username } = loginDetails;
  const { isLoggedIn } = useUserStore.getState();
  if (isLoggedIn) throw new Error('Already logged in.');

  jest.spyOn(window, 'prompt').mockReturnValueOnce(username);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  loginButton.click();

  await new Promise<void>((resolve, reject) => {
    socket.on('connect', resolve);
    socket.on('connect_error', reject);
  });
}
export async function test_login(loginDetails: TestLoginDetails) {
  await act(async () => await test_login_pure(loginDetails));
}

export async function test_loginWithRetry(
  failingUsername: string,
  retryUsername: string
) {
  const promptSpy = jest
    .spyOn(window, 'prompt')
    .mockReturnValueOnce(failingUsername)
    .mockReturnValueOnce(retryUsername);

  const loginButton = screen.getByRole('button', { name: 'Login' });
  loginButton.click();

  await waitFor(() => expect(promptSpy).toHaveBeenCalledTimes(2));
}

export function test_logout() {
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) throw new Error('Already logged out.');

  jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
  const logoutButton = screen.getByRole('button', { name: 'Logout' });
  logoutButton.click();
  socket.disconnect(); // have to hardcode this functionality; socket.io is tripping
}

export function getLocalUserState(): UserState {
  const userStore = useUserStore.getState();
  return produce(userStore, (draft) => {
    Object.keys(userStore).forEach((field) => {
      const _field = field as keyof UserStore;
      if (isFunction(userStore[_field])) delete draft[_field];
    });
  });
}

export function getPersistentUserState(): UserState {
  const userStringified = localStorage.getItem(`${APP_NAME}-user`);
  if (userStringified === null) throw new Error('User is null in localStorage');
  return JSON.parse(userStringified).state;
}
