import * as Redux from 'react-redux';

import { UIState } from '../../../../store';
import { UserState } from '../../../../store/user';

interface UseGame {
  session: string | null;
}

export const useGame = (): UseGame => {
  const user = Redux.useSelector<UIState, UserState>((state) => state.user);

  return {
    session: user.session,
  }
}