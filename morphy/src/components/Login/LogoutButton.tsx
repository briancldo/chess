import React from 'react';

import Button from '../ui/Button';
import { logout } from '../../utils/user/login/auth';

const LogoutButton: React.FC = () => {
  function handleClick() {
    const shouldLogout = confirm('Are you sure you want to logout?');
    if (shouldLogout) logout();
  }

  return (
    <>
      <Button onClick={handleClick} data-testid='logout-button'>
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
