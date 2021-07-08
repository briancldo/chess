import React from 'react';

import LoginOrOutButton from './components/Login/LoginOrOutButton';
import Router from './pages/Router';
import './App.css';

export default function App() {
  return (
    <>
      <div className='login-or-out-button'>
        <LoginOrOutButton />
      </div>
      <Router />
    </>
  );
}
