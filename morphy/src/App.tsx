import React from 'react';

import Router from './pages/Router';
import DebugInfo from './components/misc/DebugInfo';
import ActionButtons from './components/AppBar/ActionButtons';

export default function App() {
  return (
    <>
      <DebugInfo />
      <ActionButtons />
      <Router />
    </>
  );
}
