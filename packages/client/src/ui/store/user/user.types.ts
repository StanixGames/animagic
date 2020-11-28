import { Reducer, Action } from 'redux';

export interface UserState {
  session: string | null;
}

export enum UserActions {
  SESSION_SET = 'SESSION_SET',
}

export interface UserActionType extends Action {
  type: UserActions;
  payload: string | null;
}

export type UserReducerType = Reducer<UserState, UserActionType>;