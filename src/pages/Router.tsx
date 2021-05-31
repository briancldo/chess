import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GameView from '../components/Game/GameView';
import PositionGenerator from '../components/Board/Board/PositionGenerator';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <GameView />
        </Route>
        <Route exact path='/editor'>
          <PositionGenerator />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterComponent;
