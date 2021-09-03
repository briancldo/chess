jest.mock('socket.io-client');

jest.mock('socket.io-client');

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { io, Socket } from 'socket.io-client';

import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import useUserStore from '../../store/user';
import { test_login, test_logout } from '../__utils__/login.test.utils';
import { Server } from 'socket.io';
import { getMockServer } from '../__utils__/ws/mockServer';

describe.skip('#LoginOrOutButton', () => {
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
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Button labels', () => {
    test('Login button displays "Login"', () => {
      render(<LoginOrOutButton />);
      const loginButton = screen.getByTestId('login-button');
      expect(loginButton.textContent).toBe('Login');
    });

    test('Logout button displays "Logout"', async () => {
      render(<LoginOrOutButton />);
      await test_login({ username: 'brido' });

      const logoutButton = screen.getByTestId('logout-button');
      expect(logoutButton.textContent).toBe('Logout');
    });
  });

  describe('Pre-login', () => {
    test('correct store configuration', () => {
      render(<LoginOrOutButton />);

      const state = useUserStore.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.username).toBeNull();
    });

    test('button is login button', () => {
      render(<LoginOrOutButton />);
      expect(() => screen.getByTestId('login-button')).not.toThrowError();
    });

    test('not connected to socket server', () => {
      render(<LoginOrOutButton />);
      expect(socket.connect).not.toHaveBeenCalled();
    });
  });

  describe('Logging in', () => {
    test('sets store config correctly', async () => {
      render(<LoginOrOutButton />);
      await test_login({ username: 'brido' });

      const state = useUserStore.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.username).toBe('brido');
    });

    test('connects to socket server', async () => {
      render(<LoginOrOutButton />);
      await test_login({ username: 'brido' });

      expect(socket.connect).toHaveBeenCalled();
    });
  });

  describe('Logged in', () => {
    test('button is logout button', async () => {
      render(<LoginOrOutButton />);
      await test_login({ username: 'brido' });

      expect(() => screen.getByTestId('logout-button')).not.toThrowError();
    });
  });

  describe('Logging out', () => {
    test('sets store config correctly', async () => {
      render(<LoginOrOutButton />);
      await test_login({ username: 'brido' });
      await test_logout();

      const state = useUserStore.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.username).toBeNull();
    });

    test('disconnects from socket server', async () => {
      render(<LoginOrOutButton />);
      await test_login({ username: 'brido' });
      await test_logout();

      expect(socket.disconnect).toHaveBeenCalled();
    });
  });
});
