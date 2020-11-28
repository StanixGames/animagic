import * as React from 'react';
import * as Redux from 'react-redux';

import * as API from '../../../../api';
import * as UserActions from '../../../../store/user/user.actions';

interface UseLogin {
  isLoading: boolean;
  login: (login: string, password: string) => Promise<void>;
}

export const useLogin = (): UseLogin => {
  const dispatch = Redux.useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const login = async (login: string, password: string) => {
    setIsLoading(true);

    const setSession = (session: string | null) => {
      setIsLoading(false);
      dispatch(UserActions.setSession(session));
    };

    try {
      const { data } = await API.login({ login, password });

      if (data.result === 'ok') {
        const { session } = data.data;
        setSession(session);

      } else if (data.result === 'error') {
        setSession(null);
      }
    } catch (error) {
      console.log('error', error);
      setSession(null);
    }
  }

  return {
    isLoading,
    login,
  }
}