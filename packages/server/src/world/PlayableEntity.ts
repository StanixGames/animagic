import { Vector } from '../utils';

export class PlayableEntity {
  public id: string;
  public login: string;

  constructor(id: string, login: string) {
    this.id = id;
    this.login = login;
  }
}
