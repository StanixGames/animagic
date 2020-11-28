import {
  UserReducerType,
  UserState,
  UserActionType,
  UserActions,
} from './user.types';

const initState: UserState = {
  session: null,
};

export const userReducer: UserReducerType = (state = initState, action: UserActionType) => {
  switch (action.type) {
    case UserActions.SESSION_SET: {
      return {
        ...state,
        session: action.payload,
      };
    }
    default:
      return state;
  }
};