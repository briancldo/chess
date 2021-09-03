jest.mock('socket.io-client');

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { Server } from 'socket.io';

import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import * as data from './support/login.data';
import { socket } from '../../backend/ws/instance';
import {
  getLocalUserState,
  getPersistentUserState,
  test_login,
  test_logout,
} from '../__utils__/login.test.utils';
import useUserStore from '../../store/user';
import { getMockServer } from '../__utils__/ws/mockServer';

const testUsername = 'brido';

describe('user.login', () => {
  let mockServer: Server;

  beforeAll(async () => {
    mockServer = await getMockServer();
  });

  afterAll(() => {
    mockServer.close();
  });

  afterEach(async () => {
    if (useUserStore.getState().isLoggedIn) test_logout();
    mockServer.removeAllListeners();
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('persistent login state', () => {
    test('login state is saved to localStorage', async () => {
      render(<LoginOrOutButton />);

      let user = getPersistentUserState();
      expect(user).toEqual(data.preLoginState);

      await test_login({ username: testUsername });
      user = getPersistentUserState();
      expect(user).toEqual(data.loginState);
    });

    test('login state is restored on page load', async () => {
      render(<LoginOrOutButton />);

      await test_login({ username: testUsername });
      refreshPage();
      const user = getLocalUserState();
      expect(user).toEqual(data.loginState);
    });
  });

  test('properly handles login error', async () => {
    render(<LoginOrOutButton />);
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementationOnce(() => ({}));
    const storeLoginSpy = jest.spyOn(useUserStore.getState(), 'login');
    mockServer.use((socket, next) => {
      if (socket.handshake.auth.username === 'throw-error')
        next(new Error('mock error'));
    });

    await expect(test_login({ username: 'throw-error' })).rejects.toThrow(
      'mock error'
    );
    expect(alertSpy).toHaveBeenCalledWith('Error logging in: mock error');
    expect(storeLoginSpy).not.toHaveBeenCalled();
  });
});

function refreshPage() {
  act(() => location.assign(location.href));
}
