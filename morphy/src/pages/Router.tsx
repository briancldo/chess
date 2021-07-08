import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import GameView from '../components/Game/GameView';
import PositionGenerator from '../components/Board/Board/PositionGenerator';
import { GameLocationState } from './utils/routes';

// TODO: Remove, as is temp
import LoginButton from '../components/Login/LoginButton';
import LogoutButton from '../components/Login/LogoutButton';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <GameViewRoute />
        </Route>
        <Route exact path='/editor'>
          <PositionGenerator />
        </Route>
        <Route exact path='/test'>
          <LoginButton />
          <LogoutButton />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterComponent;

const GameViewRoute: React.FC = () => {
  const location = useLocation() as { state?: GameLocationState };
  const initialBoard = location.state?.board;

  return <GameView initialBoard={initialBoard} />;
};
