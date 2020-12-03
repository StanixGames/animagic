import * as Colyseus from 'colyseus.js';

export class World {
  private room: Colyseus.Room<any> | null;
  private client: Colyseus.Client;

  constructor(client: Colyseus.Client) {
    this.client = client;
    this.room = null;
  }

  init(options?: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.client) {
        throw new Error('Invalid client');
      }
  
      try {
        this.room = await this.client.joinOrCreate('world', options);
  
        if (!this.room) {
          throw new Error('Invalid room');
        }

        this.room.onMessage("JOIN", (message) => {
          console.log(this?.client, "received on", this.room?.name, message);
        });
  
        this.room.onError((code, message) => {
          console.log(this?.client, "couldn't join", this.room?.name);
        });
  
        this.room.onLeave((code) => {
          console.log(this?.client, "left", this.room?.name);
        });
  
        console.log('joined', this.room);
        
        return resolve();
      } catch (error) {
        console.log(error);
        return reject();
      }
    });
  }

  destroy(): Promise<void> {
    return new Promise((resolve) => {
      if (this.room) {
        this.room.leave();
      }
      return resolve();
    });
  }
}