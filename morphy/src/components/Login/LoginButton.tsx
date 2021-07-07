import React from 'react';

import Button from '../ui/Button';

const LoginButton: React.FC = () => {
  function handleClick() {
    let username;
    do {
      username = prompt('Select a username:');
    } while (!username);
    alert(`The username you chose is: ${username}`);
  }

  return <Button onClick={handleClick}>Login</Button>;
};

export default LoginButton;
