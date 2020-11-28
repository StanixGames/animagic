import * as PIXI from 'pixi.js';

import { WorldManager } from './World';
import { InputManager, PlayerManager, CameraManager } from './managers';
import { NetworkManager } from './network/NetworkManager';
import { Renderer } from './renderer';

export class Game {
  private previousTick = 0;
  private tickUpdateLengthMs = 16;

  readonly app: PIXI.Application;
  readonly renderer: Renderer;
  readonly worldManager: WorldManager;
  readonly inputManager: InputManager;
  readonly playerManager: PlayerManager;
  readonly cameraManager: CameraManager;
  readonly networkManager: NetworkManager;

  constructor() {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x2B2B2B,
    });

    this.worldManager = new WorldManager(this);
    this.inputManager = new InputManager(this);
    this.playerManager = new PlayerManager(this, '123');
    this.cameraManager = new CameraManager(this);
    this.networkManager = new NetworkManager(this);

    this.renderer = new Renderer(this);

    window.addEventListener("resize", () => {
      console.log('resize')
      this.app.renderer.resize(window.innerWidth, window.innerHeight);

      this.renderer.resize(window.innerWidth, window.innerHeight);
    });
  }

  attachToDOM(): Promise<void> {
    const gameElem = document.getElementById('game');
        
    if (gameElem && this.app) {
      gameElem.appendChild(this.app.view);
      this.app.ticker.add(this.tick);

      return Promise.resolve();
    } else {
      return Promise.reject('Cannot attach the game to DOM');
    }
  }

  init = (session: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      
      this.networkManager.attachSession(session);

      try {
        await Promise.all([
          this.networkManager.init(),
          this.attachToDOM(),

          this.worldManager.init(),
          this.inputManager.init(),
          this.cameraManager.init(),
          this.playerManager.init(),

          this.renderer.init(),
        ]);
        resolve();       
      } catch (error) {
        await this.destroy();
        reject(error);
      }
      
      // this.worldRenderer.init();
      // this.entityRenderer.init();
    });
  };

  destroy = (): Promise<void[]> => {
    return Promise.all([
      this.renderer.destroy(),

      this.playerManager.destroy(),
      this.cameraManager.destroy(),
      this.inputManager.destroy(),
      this.worldManager.destroy(),

      this.networkManager.destroy(),
    ]);

    // this.worldRenderer.destroy();
    // this.entityRenderer.destroy();
  };

  tick = (time: number) => {
    const now = Date.now();

    if (this.previousTick + this.tickUpdateLengthMs <= now) {
      var delta = (now - this.previousTick) / 1000;
      this.previousTick = now;

      this.update(delta);
      // console.log(1000 / (delta * 1000))
    }
  }

  update = (delta: number) => {
    this.networkManager.update(delta);
    this.playerManager.update(delta);

    this.renderer.prepare();

    this.renderer.render();
  };
}
