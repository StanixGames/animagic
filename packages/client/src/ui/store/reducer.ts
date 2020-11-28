import {combineReducers} from 'redux';
import {playersReducer} from './players';
import {userReducer} from './user';

export const reducer = combineReducers({
  players: playersReducer,
  user: userReducer,
});
