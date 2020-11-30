import WebSocket from 'ws';
import express from 'express';
import http from 'http';
import {v4} from 'uuid';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { PacketManager, NetworkManager } from './network';
import { Entity } from './world';
import { game } from './Game';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

const app = express();
const server = http.createServer(app);
const users = new Map();
const sessions = new Map();
const players = new Map();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const wss = new WebSocket.Server({
  clientTracking: false,
  noServer: true,
});

users.set('bob', {
  login: 'bob',
  password: '123456',
  firstName: 'Bob',
  lastName: 'Marley',
});
users.set('mike', {
  login: 'mike',
  password: '123456',
  firstName: 'Mike',
  lastName: 'Vazovsky',
});

// sessions.set('1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746', {
//   session: '1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746',
//   login: 'bob',
// });

// players.set('bob', {
//   login: 'bob',
//   playerEntityId: '12345',
// })

const doLogin = (login: string, password: string): string | null => {
  if (users.has(login) && users.get(login).password === password) {
    for (let s of sessions.values()) {
      if (s.login === login) {
        return s.session;
      }
    }

    const session = `${v4()}.${v4()}`;

    sessions.set(session, {
      session,
      login,
    });
    
    return session;
  }
  return null;
}

const doLogout = (session: string) => {
  if (sessions.has(session)) {
    sessions.delete(session);
  }
}

const doCheckSession = (session: string): boolean => {
  return sessions.has(session);
}

const doGetUser = (session: string) => {
  if (!sessions.has(session)) {
    return null;
  }

  const { login } = sessions.get(session);

  if (!users.has(login)) {
    return null;
  }

  return users.get(login);
}

// const doGetPlayer = (session: string): Entity | null => {
//   const user = doGetUser(session);

//   if (!user) {
//     return null;
//   }

//   const { login } = user;

//   const playerEntity = game.worldManager.getPlayerEntity(login);

//   return playerEntity;
// }

// const doCreatePlayer = (session: string) => {

// }

app.post('/login', async (req: any, res: any) => {
  await delay(1000);

  const { login, password } = req.body;
  const session = doLogin(login, password);

  if (!session) {
    res.status(400).send({
      result: 'error',
      data: {
        message: 'Invalid credentials',
      }
    });
  } else {
    res.status(200).send({
      result: 'ok',
      data: {
        session,
      },
    });
  }
});

app.delete('/logout', async (req: any, res: any) => {
  await delay(1000);

  const { session } = req.body;
  doLogout(session);

  res.status(200).send({
    result: 'ok',
    data: {
      message: 'Logout'
    }
  })
});

app.get('/user', async (req: any, res: any) => {
  await delay(1000);

  const { session } = req.body;

  if (doCheckSession(session)) {
    res.status(200).send({
      result: 'ok',
      data: {
        firstName: 'Test',
        lastName: 'Test',
      }
    });
  } else {
    res.status(401).send({
      result: 'error',
      data: {
        message: 'Invalid session',
      }
    });
  }
});

server.on('upgrade', async (req: any, socket: any, head: any) => {
  // console.log('wait 1 sec');
  // await delay(1000);
  // console.log('done wait');

  const session = req.url.substring(2);
  const user = doGetUser(session);

  if (doCheckSession(session) && user) {
    wss.handleUpgrade(req, socket, head, (ws: any) => {

      const {
        login,
        firstName,
        lastName,
      } = user;

      NetworkManager.handleConnection(ws, session, login, firstName, lastName);

      wss.emit('connection', ws, session);
    });
  } else {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
  }
});

wss.on('connection', function (socket: WebSocket, session: string) {
  socket.on('message', (message: string) => {
    // console.log(session, message);
    const user = doGetUser(session);

    if (!user) {
      console.error('Invalid user!');
      socket.close();
    }

    try {
      const packet = PacketManager.parsePacket(message, socket, user.login);

      if (!packet) {
        console.log('Invalid Packet!', message);        
        return;
      }

      PacketManager.queuePacket(packet);
    } catch (e) {
      console.error(e.message);
    }
  });

  socket.on('close', () => {
    // sessions.delete(userId);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${SERVER_PORT}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');

  game.destroy();
});
