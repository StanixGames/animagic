import * as Redux from 'react-redux';

import { UIState } from '../../../store';
import { UserState } from '../../../store/user';

interface UseApp {
  isAuthorized: boolean;
}

export const useApp = (): UseApp => {
  const user = Redux.useSelector<UIState, UserState>((state) => state.user);
  const isAuthorized = !!user.session;

  console.log(user.session, isAuthorized)

  return {
    isAuthorized,
  }
}