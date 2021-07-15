import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import LoginOrOutButton from '../../components/Login/LoginOrOutButton';
import * as data from './support/login.data';
import { getPersistentUserState, test_login } from '../__utils__/login.utils';

describe('login', () => {
  describe('persistent login state', () => {
    test('login state is saved to localStorage', () => {
      render(<LoginOrOutButton />);

      let user = getPersistentUserState();
      expect(user).toEqual(data.preLoginState);

      test_login({ username: 'brido' });
      user = getPersistentUserState();
      expect(user).toEqual(data.loginState);
    });

    test.todo('login state is restored on page load');
  });

  test.todo('restores socket connection');
});
