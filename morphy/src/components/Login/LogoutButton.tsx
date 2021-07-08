import React from 'react';

import useUserStore from '../../store/user';
import Button from '../ui/Button';

const LogoutButton: React.FC = () => {
  const logout = useUserStore((state) => state.logout);

  function handleClick() {
    const shouldLogout = confirm('Are you sure you want to logout?');
    if (shouldLogout) logout();
  }

  return (
    <>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

export default LogoutButton;
