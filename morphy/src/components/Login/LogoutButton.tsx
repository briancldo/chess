import React from 'react';

import useUserStore from '../../store/user';
import Button from '../ui/Button';

const LogoutButton: React.FC = () => {
  const logout = useUserStore((state) => state.logout);

  function handleClick() {
    logout();
  }

  return (
    <>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

export default LogoutButton;
