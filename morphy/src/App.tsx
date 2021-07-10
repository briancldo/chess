import React from 'react';

import Router from './pages/Router';
import LoginSection from './components/Login/LoginSection';
import PingButton from './components/misc/PingButton';
import './App.css';

export default function App() {
  return (
    <>
      <div className='app-action-buttons'>
        <PingButton />
        <LoginSection />
      </div>
      <Router />
    </>
  );
}
