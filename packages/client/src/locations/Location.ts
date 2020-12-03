import * as Colyseus from 'colyseus.js';
import { MapSchema, ArraySchema } from "@colyseus/schema";

import { AABB, Entity, Tile } from '../models';

import { LocationState } from './LocationState';

export class Location<State extends LocationState> {
  readonly id: string;
  private room: Colyseus.Room<State> | null;
  private client: Colyseus.Client;

  constructor(id: string, client: Colyseus.Client) {
    this.client = client;
    this.id = id;
    this.room = null;
  }

  init(options?: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.client) {
        throw new Error('Invalid client');
      }
  
      try {
        this.room = await this.client.joinOrCreate(this.id, options);
  
        if (!this.room) {
          throw new Error('Invalid room');
        }
  
        console.log('entities', this.room.state.entities)
  
        this.room.onStateChange((state) => {
          console.log(this.room?.name, "has new state:", state);
        });
  
        this.room.onMessage("message_type", (message) => {
          console.log(this?.client, "received on", this.room?.name, message);
        });
  
        this.room.onError((code, message) => {
          console.log(this?.client, "couldn't join", this.room?.name);
        });
  
        this.room.onLeave((code) => {
          console.log(this?.client, "left", this.room?.name);
        });
  
        console.log('joined', this.room);
        resolve();
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  destroy(): Promise<void> {
    return new Promise((resolve) => {
      if (this.room) {
        this.room.leave();
      }
      resolve();
    });
  }

  public getBounds = (): AABB | undefined => {
    return this.room?.state.bounds;
  }

  public getEntities = (): MapSchema<Entity> | undefined => {
    return this.room?.state.entities;
  };

  public getTiles = (): ArraySchema<Tile> | undefined => {
    return this.room?.state.tiles;
  };
}