import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

// import { useLogin } from './hooks';
import './LobbyScreen.css';

export const LobbyScreen: React.FC<{}> = () => {
  const history = ReactRouterDOM.useHistory();

  const handleJoinGame = React.useCallback(() => {
    history.push('/game');
  }, []);

  return (
    <div className="LobbyScreen-wrapper">
      <div className="LobbyScreen-title">Server 1: localhost:1993</div>
      <button
        className="LoginScreen-button"
        type="submit"
        // disabled={Login.isLoading}
        onClick={handleJoinGame}
      >
        Join game
      </button>
    </div>
  );
}
