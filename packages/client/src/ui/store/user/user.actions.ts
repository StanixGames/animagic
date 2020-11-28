import { UserActionType, UserActions } from './user.types';

export const setSession = (payload: string | null): UserActionType => ({
  type: UserActions.SESSION_SET,
  payload,
});
