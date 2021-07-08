import React from 'react';

import useUserStore from '../../store/user';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const LoginOrOutButton: React.FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const state = useUserStore();
  const AuthButton = isLoggedIn ? LogoutButton : LoginButton;

  return (
    <>
      <p>
        isLoggedIn: {state.isLoggedIn.toString()}; username: {state.username}
      </p>
      <AuthButton />
    </>
  );
};

export default LoginOrOutButton;
