import React from 'react';

import LoginOrOutButton from './LoginOrOutButton';
import useUserStore from '../../store/user';
import { useReconnect } from '../../utils/user/login/reconnect';

const LoginSection: React.FC = () => {
  const username = useUserStore((state) => state.username);
  useReconnect();

  return (
    <>
      {username && <span>Logged in as: {username}</span>}
      <LoginOrOutButton />
    </>
  );
};

export default LoginSection;
