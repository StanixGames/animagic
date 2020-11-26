import {combineReducers} from 'redux';
import {playersReducer} from './players';

export const reducer = combineReducers({
  players: playersReducer,
});
