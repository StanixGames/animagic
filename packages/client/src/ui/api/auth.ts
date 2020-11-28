import { client, APIResponse } from './client';

interface LoginParams {
  login: string;
  password: string;
}

type LoginResponse = APIResponse<{
  session: string;
}>;

export const login = (params: LoginParams): Promise<LoginResponse> => {
  return client.post('login', params);
}

export const logout = (): Promise<void> => {
  return client.delete('logout');
}