jest.mock('socket.io-client');

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Server, Socket as ServerSocket } from 'socket.io';
import { io, Socket as ClientSocket } from 'socket.io-client';

import { getMockServer } from '../__utils__/ws/mockServer';
import useUserStore from '../../store/user';
import {
  test_login,
  test_loginWithRetry,
  test_logout,
} from '../__utils__/login.test.utils';
import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import {
  InitializationErrorReason,
  InitializationStatus,
} from '../../backend/ws/initialization';

const testUsername = 'brido';
type InitializationCallback = (
  status: InitializationStatus,
  reason?: InitializationErrorReason
) => void;

describe('user.initialization', () => {
  let mockServer: Server, mockServerSocket: ServerSocket, socket: ClientSocket;
  let initializationHandler: (
    username: string,
    callback: InitializationCallback
  ) => void;

  beforeAll(async () => {
    mockServer = await getMockServer();
    socket = io();
  });

  afterAll(() => {
    if (socket.connected) socket.disconnect();
    mockServer.close();
  });

  beforeEach(() => {
    mockServer.on('connection', (serverSocket) => {
      mockServerSocket = serverSocket;

      // "initializationHandler" is changed in each test to setup
      // the handler suited for that particular test
      serverSocket.on('initialization', initializationHandler);
    });
  });

  afterEach(async () => {
    if (useUserStore.getState().isLoggedIn) await test_logout();
    localStorage.clear();
    jest.clearAllMocks();
    if (mockServerSocket) mockServerSocket.removeAllListeners();
  });

  test('initializes on first connection', async () => {
    render(<LoginOrOutButton />);
    initializationHandler = (username, callback) => {
      callback('success');
    };

    await test_login({ username: testUsername });
    assertInitializationError({ error: false });
  });

  test('no initialization when session is active', async () => {
    useUserStore.setState({ isLoggedIn: true });
    socket.disconnect();
    render(<LoginOrOutButton />);
    initializationHandler = jest.fn();

    expect(socket.connect).toHaveBeenCalled();
    expect(initializationHandler).not.toHaveBeenCalled();
  });

  describe('error cases', () => {
    test('connection id taken - does not raise error', async () => {
      render(<LoginOrOutButton />);
      initializationHandler = (username, callback) => {
        callback('error', 'connection-id-taken');
      };

      await test_login({ username: testUsername });
      assertInitializationError({ error: false });
    });

    test('username taken', async () => {
      render(<LoginOrOutButton />);
      const failingUsername = 'badusername';
      const retryUsername = testUsername;
      initializationHandler = (username, callback) => {
        if (username === failingUsername) callback('error', 'username-taken');
        if (username === retryUsername) callback('success');
      };

      await test_loginWithRetry(failingUsername, retryUsername);
      assertInitializationError({ error: true, message: 'Username is taken.' });
    });
  });
});

type InitializationErrorConfig = { error: boolean; message?: string };
function assertInitializationError(config: InitializationErrorConfig) {
  const promptSpy = jest.spyOn(window, 'prompt');
  const { error, message } = config;

  if (!error) expect(promptSpy).toHaveBeenCalledTimes(1);
  if (error) {
    expect(promptSpy).toHaveBeenCalledTimes(2);
    expect(promptSpy).toHaveBeenCalledWith(message);
  }
}
