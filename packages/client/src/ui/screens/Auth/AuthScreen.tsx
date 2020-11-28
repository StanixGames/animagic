import React from 'react';
import { Switch, Route, useHistory } from "react-router-dom";

import { LoginScreen } from './LoginScreen';

const VALID_PATHNAMES = [
  '/login',
  '/sign-up'
];

export const AuthScreen: React.FC<{}> = () => {
  const history = useHistory();
  const { pathname } = history.location;

  React.useEffect(() => {
    if (!VALID_PATHNAMES.includes(pathname)) {
      history.push('/login');
    }
  }, [pathname]);

  console.log(history)
  return (
    <Switch>
      <Route path="/login" component={LoginScreen} />
    </Switch>
  );
};
