jest.mock('socket.io-client');

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { io, Socket } from 'socket.io-client';
import { Server } from 'socket.io';

import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import * as data from './support/login.data';
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
  let mockServer: Server, socket: Socket;

  beforeAll(async () => {
    mockServer = await getMockServer();
    socket = io();
  });

  afterAll(() => {
    if (socket.connected) socket.disconnect();
    mockServer.close();
  });

  afterEach(async () => {
    if (useUserStore.getState().isLoggedIn) await test_logout();
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
    let nextObj: Error | undefined = new Error('mock error');
    mockServer.use((_, next) => {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      next(nextObj);
    });

    await expect(test_login({ username: testUsername })).rejects.toThrow(
      'mock error'
    );
    expect(alertSpy).toHaveBeenCalledWith('Error logging in: mock error');

    expect(mockServer.of('/').sockets.size).toBe(0);
    expect(storeLoginSpy).not.toHaveBeenCalled();

    nextObj = undefined;
  });

  test('restores socket connection on reload if logged in', async () => {
    jest.spyOn(window, 'alert').mockImplementationOnce(() => ({}));
    render(<LoginOrOutButton />);

    await test_login({ username: testUsername });
    expect(socket.connected).toBe(true);

    refreshPage();
    await screen.getByRole('button', { name: 'Logout' });
    expect(socket.connected).toBe(true);
  });
});

function refreshPage() {
  act(() => location.assign(location.href));
}
