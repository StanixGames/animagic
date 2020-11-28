import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import { store } from '../../store';

import { AuthScreen } from '../Auth';
import { UserScreen } from '../User';

import { useApp } from './hooks';
import './App.css';

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
})

const AppInner: React.FC<{}> = () => {
  const AppState = useApp();

  if (AppState.isAuthorized) {
    return (
      <UserScreen />
    );
  }
  return (
    <AuthScreen />
  );
}

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppInner />
      </Router>
    </Provider>
  );
};
