import { v4 } from 'uuid';
import * as Colyseus from 'colyseus';

import { DB } from '../server/db';
import { game } from '../Game';

export class World extends Colyseus.RelayRoom {
  constructor() {
    super();
  }

  onJoin = (client: Colyseus.Client, options?: any) => {
    console.log('join world client', client.userData);
    client.send('JOIN', { hello: 'there' });
  }

  onAuth(client: Colyseus.Client, options: any, req: any): boolean {
    const { session } = options;

    if (DB.checkSession(session)) {
      const user = DB.getUser(session);

      if (!user) {
        return false;
      }

      const { login } = user;
      console.log('known user', user.login);
      client.userData = {
        login,
      };
      
      return true;
    }
    return false;
  }

  onLeave = (client: Colyseus.Client, consented: boolean): Promise<void> => {
    console.log('leave world client', client.userData);
    return Promise.resolve();
  }
}