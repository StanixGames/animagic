import {v4} from 'uuid';

const users = new Map();
const sessions = new Map();
// const players = new Map();

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

sessions.set('1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746', {
  session: '1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746',
  login: 'bob',
});

// players.set('bob', {
//   login: 'bob',
//   playerEntityId: '12345',
// })

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

export class DB {
  public static login = (login: string, password: string): string | null => {
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

  public static logout = (session: string) => {
    if (sessions.has(session)) {
      sessions.delete(session);
    }
  }

  public static checkSession = (session: string): boolean => {
    return sessions.has(session);
  }

  public static getUser = (session: string) => {
    if (!sessions.has(session)) {
      return null;
    }
  
    const { login } = sessions.get(session);
  
    if (!users.has(login)) {
      return null;
    }
  
    return users.get(login);
  }
}
