import React from 'react';

import useUserStore from '../../store/user';
import { useReconnect } from '../../utils/user/login/reconnect';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const LoginOrOutButton: React.FC = () => {
  useReconnect();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const AuthButton = isLoggedIn ? LogoutButton : LoginButton;

  return <AuthButton />;
};

export default LoginOrOutButton;
