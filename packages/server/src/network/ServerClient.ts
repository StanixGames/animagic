import WebSocket from 'ws';

export type ServerClient = {
  login: string;
  firstName: string;
  lastName: string;
  session: string;
  socket: WebSocket;
};
