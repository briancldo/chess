import React from 'react';

import Button from '../ui/Button';
import { login } from '../../utils/user/login/login';

const LoginButton: React.FC = () => {
  function handleClick() {
    let username;
    do {
      username = prompt('Select a username:');
      if (username === null) return;
    } while (!username);
    login({ username });
  }

  return (
    <Button onClick={handleClick} data-testid='login-button'>
      Login
    </Button>
  );
};

export default LoginButton;
