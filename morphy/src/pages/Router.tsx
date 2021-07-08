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
import LoginOrOutButton from '../components/Login/LoginOrOutButton';

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
          <LoginOrOutButton />
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
