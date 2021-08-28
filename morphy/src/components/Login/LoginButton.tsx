import React from 'react';

import Button from '../ui/Button';
import { promptLogin } from '../../utils/user/login/auth';

const LoginButton: React.FC = () => {
  async function handleClick() {
    await promptLogin();
  }

  return (
    <Button onClick={handleClick} data-testid='login-button'>
      Login
    </Button>
  );
};

export default LoginButton;
