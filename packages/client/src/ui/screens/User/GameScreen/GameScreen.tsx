import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import { LoadingOverlay } from '../../../components';

import { Game } from '../../../../Game';

import { useGame } from './hooks';
import './GameScreen.css';

const GAME = new Game();

export const GameScreen: React.FC<{}> = () => {
  const history = ReactRouterDOM.useHistory();
  const GameState = useGame();
  const [isLoading, setIsLoading] = React.useState(true);

  const initGame = React.useCallback(async () => {
    if (GameState.session) {
      try {
        await GAME.init(GameState.session);
      } catch (error) {
        console.log('game is not setup');
        await GAME.destroy();
        history.push('/lobby');
      }
    }
    setIsLoading(false);
  }, [setIsLoading]);

  const destroyGame = React.useCallback(async () => {
    await GAME.destroy();
  }, [setIsLoading]);

  const handleEndGame = React.useCallback(async () => {
    setIsLoading(true);
    await GAME.destroy();
    setIsLoading(false);
    history.push('/lobby');
  }, []);

  React.useEffect(() => {
    initGame();

    return () => {
      destroyGame();
    }
  }, []);

  console.log('isLoading', isLoading)

  return (
    <>
    <div className="GameScreen-wrapper">
      <div id="game" />
      <div className="GameScreen-header">
        <button
          className="GameScreen-button"
          disabled={isLoading}
          onClick={handleEndGame}
        >
          Back to lobby
        </button>
      </div>
    </div>
    <LoadingOverlay visible={isLoading} />
    </>
  );
}
