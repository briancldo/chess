jest.mock('socket.io-client');

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

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
    jest.clearAllMocks();
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

    test('login state is restored on page load', () => {
      render(<LoginOrOutButton />);

      test_login({ username: 'brido' });
      refreshPage();
      const user = getLocalUserState();
      expect(user).toEqual(data.loginState);
    });
  });

  test('restores socket connection on reload if logged in', async () => {
    const { rerender } = render(<LoginOrOutButton key={uuidv4()} />);

    test_login({ username: 'brido' });
    expect(socketInstance.connected).toBe(true);

    // simulating page reload (this order matters!)
    socketInstance.connected = false;
    rerender(<LoginOrOutButton key={uuidv4()} />);
    refreshPage();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Logout' })
      ).toBeInTheDocument();
    });
    expect(socketInstance.connected).toBe(true);
  });
});

function refreshPage() {
  location.assign(location.href);
}
