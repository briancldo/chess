import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import useUserStore from '../../store/user';
import { test_login, test_logout } from '../__utils__/login.utils';
import { act } from 'react-dom/test-utils';

const initialUserStoreState = useUserStore.getState();

describe('#LoginOrOutButton', () => {
  afterEach(() => {
    act(() => useUserStore.setState(initialUserStoreState));
  });

  describe('Button labels', () => {
    test('Login button displays "Login"', () => {
      render(<LoginOrOutButton />);
      const loginButton = screen.getByTestId('login-button');
      expect(loginButton.textContent).toBe('Login');
    });

    test('Logout button displays "Logout"', () => {
      render(<LoginOrOutButton />);
      test_login({ username: 'brido' });

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
      useUserStore.setState({ username: 'asd' });
    });

    test('button is login button', () => {
      render(<LoginOrOutButton />);
      expect(() => screen.getByTestId('login-button')).not.toThrowError();
    });
  });

  describe('Logging in', () => {
    test('sets store config correctly', () => {
      render(<LoginOrOutButton />);
      test_login({ username: 'brido' });

      const state = useUserStore.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.username).toBe('brido');
    });
  });

  describe('Logged in', () => {
    test('button is logout button', () => {
      render(<LoginOrOutButton />);
      test_login({ username: 'brido' });

      expect(() => screen.getByTestId('logout-button')).not.toThrowError();
    });
  });

  describe('Logging out', () => {
    test('sets store config correctly', () => {
      render(<LoginOrOutButton />);
      test_login({ username: 'brido' });
      test_logout();

      const state = useUserStore.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.username).toBeNull();
    });
  });
});
