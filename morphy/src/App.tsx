import React from 'react';

import LoginSection from './components/Login/LoginSection';
import Router from './pages/Router';
import './App.css';

export default function App() {
  return (
    <>
      <div className='login-or-out-button'>
        <LoginSection />
      </div>
      <Router />
    </>
  );
}
