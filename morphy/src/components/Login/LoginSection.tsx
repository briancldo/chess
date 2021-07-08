import React from 'react';

import LoginOrOutButton from './LoginOrOutButton';
import useUserStore from '../../store/user';

const LoginSection: React.FC = () => {
  const username = useUserStore((state) => state.username);

  return (
    <>
      {username && <span>Logged in as: {username}</span>}
      <LoginOrOutButton />
    </>
  );
};

export default LoginSection;
