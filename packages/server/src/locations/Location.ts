import * as Colyseus from 'colyseus';

import { DB } from '../server/db';

import { LocationState } from './LocationState';

export class Location<State extends LocationState> extends Colyseus.Room<State> {
  readonly id: string;

  constructor(id: string, private StateType: new () => State) {
    super();

    this.id = id;
  }

  onCreate(options: any) {
    this.setState(new this.StateType());
    this.state.init();

    console.log('created', `${this.StateType}`);
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

  onJoin(client: Colyseus.Client, options: any) {
    console.log('joined', client.id)
  }

  onLeave() {
    console.log('leave');
  }

  onDispose() {
    
    this.state.destroy();
  }
}
