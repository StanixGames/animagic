import React from 'react';
import { Switch, Route, useHistory } from "react-router-dom";

import { LobbyScreen } from './LobbyScreen';
import { GameScreen } from './GameScreen';

const VALID_PATHNAMES = [
  '/game',
  '/lobby'
];

export const UserScreen: React.FC<{}> = () => {
  const history = useHistory();
  const { pathname } = history.location;

  React.useEffect(() => {
    if (!VALID_PATHNAMES.includes(pathname)) {
      history.push('/lobby');
    }
  }, [pathname]);

  console.log(history)
  return (
    <Switch>
      <Route path="/lobby" component={LobbyScreen} />
      <Route path="/game" component={GameScreen} />
    </Switch>
  );
};
