import { produce, original } from 'immer';
import isFunction from 'lodash/isFunction';

import useUserStore, { Username, UserState, UserStore } from '../../store/user';
import { screen } from '@testing-library/react';
import { APP_NAME } from '../../utils/constants/app.constants';

interface TestLoginDetails {
  username: Username;
}

export function test_login(loginDetails: TestLoginDetails) {
  const { username } = loginDetails;
  const { isLoggedIn } = useUserStore.getState();
  if (isLoggedIn) throw new Error('Already logged in.');

  jest.spyOn(window, 'prompt').mockReturnValueOnce(username);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  loginButton.click();
}

export function test_logout() {
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) throw new Error('Already logged out.');

  jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
  const loginButton = screen.getByRole('button', { name: 'Logout' });
  loginButton.click();
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
