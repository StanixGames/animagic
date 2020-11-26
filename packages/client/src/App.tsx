import React from 'react';
import {Provider} from 'react-redux';

import { store } from './ui/store';

import { PlayersWidget } from './ui/PlayersWidget';

import './App.css';

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
})

function App() {
  return (
    <Provider store={store}>
      <PlayersWidget />
    </Provider>
  );
}

export default App;
