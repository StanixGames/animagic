import * as Colyseus from 'colyseus.js';

import { Game } from '../Game';

import { Manager } from './Manager';

const WS_URL = 'ws://localhost:1993';

export class NetworkManager extends Manager {
  private client?: Colyseus.Client;
  private session?: string;

  constructor(game: Game) {
    super(game);
  }

  attachSession = (session: string) => {
    this.session = session;
  }

  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.session) {
        reject('Invalid session');
        return;
      }

      this.client = new Colyseus.Client(WS_URL);

      resolve();
    });
  }
  
  destroy(): Promise<void> {
    return new Promise((resolve) => {
        // TODO add disconnect?
      resolve();
    });
  }

  update = (delta: number): void => {
    // update
  }

  public getClient = (): Colyseus.Client | undefined => {
    return this.client;
  }
}