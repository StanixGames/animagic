import Axios, { AxiosResponse } from 'axios';

export type APIResponse<T> = AxiosResponse & {
  data: {
    result: 'error' | 'ok';
    data: T | {
      message: string;
    };
  };
}

const BASE_URL = 'http://192.168.68.104:1993';

export const client = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-Control': 'no-cache',
  },
});