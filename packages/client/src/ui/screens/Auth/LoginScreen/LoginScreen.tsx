import * as React from 'react';

import { useLogin } from './hooks';
import './LoginScreen.css';

export const LoginScreen: React.FC<{}> = () => {
  const [login, setLogin] = React.useState<string>('bob');
  const [password, setPassword] = React.useState<string>('123456');
  const Login = useLogin();

  const getInputChangeHandler = React.useCallback((field: string) => (event: any) => {
    if (field === 'login') {
      setLogin(event.target.value);
    } else if (field === 'password') {
      setPassword(event.target.value);
    }
  }, [setLogin, setPassword]);
  
  const handleSubmit = React.useCallback((event: any) => {
    console.log(login ,password)
    event.preventDefault();

    Login.login(login, password);
  }, [login, password]);

  return (
    <div className="LoginScreen-wrapper">
      <div className="LoginScreen-title">Game login</div>
      <form className="LoginScreen-form">
        <input
          className="LoginScreen-input"
          type="text"
          placeholder="Login"
          value={login}
          onChange={getInputChangeHandler('login')}
        />
        <input
          className="LoginScreen-input"
          type="text"
          placeholder="Password"
          value={password}
          onChange={getInputChangeHandler('password')}
        />
        <button
          className="LoginScreen-button"
          type="submit"
          disabled={Login.isLoading}
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}
