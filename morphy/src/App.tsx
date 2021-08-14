import React from 'react';

import Router from './pages/Router';
import LoginSection from './components/Login/LoginSection';
import PingButton from './components/misc/PingButton';
import DebugInfo from './components/misc/DebugInfo';
import './App.css';

export default function App() {
  return (
    <>
      <DebugInfo />
      <div className='app-action-buttons'>
        <PingButton />
        <LoginSection />
      </div>
      <Router />
    </>
  );
}
