import useUserStore, { Username } from '../../store/user';
import { screen } from '@testing-library/react';

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
