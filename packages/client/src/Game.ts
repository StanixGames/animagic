import * as PIXI from 'pixi.js';

import { InputManager, PlayerManager, CameraManager, LocationManager, WorldManager } from './managers';
import { NetworkManager } from './network/NetworkManager';
import { Renderer } from './renderer';

const TICK_RENDER_LENGTH_MS = 16;
const TICK_UPDATE_LENGTH_MS = 50;

export class Game {
  private previousTickRender = 0;
  private previousTickUpdate = 0;

  readonly app: PIXI.Application;
  readonly renderer: Renderer;
  readonly worldManager: WorldManager;
  readonly inputManager: InputManager;
  readonly playerManager: PlayerManager;
  readonly cameraManager: CameraManager;
  readonly networkManager: NetworkManager;
  readonly locationManager: LocationManager;

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
    this.locationManager = new LocationManager(this);

    this.renderer = new Renderer(this);

    window.addEventListener("resize", () => {
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
      this.locationManager.attachSession(session);
      this.worldManager.attachSession(session);
      
      try {
        await Promise.all([
          this.networkManager.init(),
          this.locationManager.init(),
          this.worldManager.init(),

          this.attachToDOM(),

          this.inputManager.init(),
          this.cameraManager.init(),
          this.playerManager.init(),

          this.renderer.init(),
        ]);

        this.locationManager.joinGrindir();

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
    this.locationManager.leaveCurrentLocation();

    return Promise.all([
      this.renderer.destroy(),

      this.playerManager.destroy(),
      this.cameraManager.destroy(),
      this.inputManager.destroy(),
      
      this.worldManager.destroy(),
      this.locationManager.destroy(),
      this.networkManager.destroy(),
    ]);

    // this.worldRenderer.destroy();
    // this.entityRenderer.destroy();
  };

  tick = (time: number) => {
    const now = Date.now();

    if (this.previousTickUpdate + TICK_UPDATE_LENGTH_MS <= now) {
      var delta = (now - this.previousTickUpdate) / 1000;
      this.previousTickUpdate = now;

      this.update(delta);
    }

    if (this.previousTickRender + TICK_RENDER_LENGTH_MS <= now) {
      var delta = (now - this.previousTickRender) / 1000;
      this.previousTickRender = now;

      this.render(delta);
    }
  }

  render = (delta: number) => {
    this.renderer.prepare();
    this.renderer.render();
    this.cameraManager.render(delta);
  };
  
  update = (delta: number) => {
    this.networkManager.update(delta);
    this.playerManager.update(delta);
    this.worldManager.update(delta);
    this.cameraManager.update(delta);
  }
}
