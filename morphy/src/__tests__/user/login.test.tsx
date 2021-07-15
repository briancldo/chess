jest.mock('socket.io-client');

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import * as data from './support/login.data';
import {
  getLocalUserState,
  getPersistentUserState,
  test_login,
  test_logout,
} from '../__utils__/login.utils';
import useUserStore from '../../store/user';
// eslint-disable-next-line jest/no-mocks-import
import { socketInstance } from '../__mocks__/socket.io-client';

describe('login', () => {
  afterEach(() => {
    if (useUserStore.getState().isLoggedIn) test_logout();
    localStorage.clear();
  });

  describe('persistent login state', () => {
    test('login state is saved to localStorage', () => {
      render(<LoginOrOutButton />);

      let user = getPersistentUserState();
      expect(user).toEqual(data.preLoginState);

      test_login({ username: 'brido' });
      user = getPersistentUserState();
      expect(user).toEqual(data.loginState);
    });

    test.only('login state is restored on page load', () => {
      render(<LoginOrOutButton />);

      test_login({ username: 'brido' });
      refreshPage();
      const user = getLocalUserState();
      expect(user).toEqual(data.loginState);
    });
  });

  test.todo('restores socket connection on reload if logged in');
});

function refreshPage() {
  location.assign(location.href);
}
