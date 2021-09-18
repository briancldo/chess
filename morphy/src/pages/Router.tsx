import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import GameView from '../components/Game/GameView';
import PositionGenerator from '../components/Board/Board/PositionGenerator';
import { GameLocationState, routeMapping } from './utils/routes';
import MatchPage from './Match';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={routeMapping.game}>
          <GameViewRoute />
        </Route>
        <Route exact path={routeMapping.match}>
          <MatchPage />
        </Route>
        <Route exact path={routeMapping.editor}>
          <PositionGenerator />
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
