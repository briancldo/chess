import React from 'react';

import useUserStore from '../../store/user';
import Button from '../ui/Button';

const LoginButton: React.FC = () => {
  const login = useUserStore((state) => state.login);

  function handleClick() {
    let username;
    do {
      username = prompt('Select a username:');
      if (username === null) return;
    } while (!username);
    login(username);
  }

  return (
    <Button onClick={handleClick} data-testid='login-button'>
      Login
    </Button>
  );
};

export default LoginButton;
