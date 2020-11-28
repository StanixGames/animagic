import * as PIXI from 'pixi.js';

import { WorldManager } from './World';
import { InputManager, PlayerManager } from './managers';
import { NetworkManager } from './network/NetworkManager';
import { WorldRenderer, EntityRenderer } from './renderer';

const FPS = 60;
const FT = 1000/FPS;
const PLAYER = `PLayer${Math.random().toFixed(3)}`

export class Game {
  private previousTick = 0;
  private tickUpdateLengthMs = 16;

  readonly app: PIXI.Application;
  readonly worldRenderer: WorldRenderer;
  readonly entityRenderer: EntityRenderer;
  readonly worldManager: WorldManager;
  readonly inputManager: InputManager;
  readonly playerManager: PlayerManager;
  readonly networkManager: NetworkManager;

  constructor() {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x2B2B2B,
    });

    this.worldManager = new WorldManager(this);
    this.inputManager = new InputManager(this);
    this.playerManager = new PlayerManager(this, PLAYER);
    this.networkManager = new NetworkManager(this);

    this.worldRenderer = new WorldRenderer(this);
    this.entityRenderer = new EntityRenderer(this);

    window.addEventListener("resize", () => {
      console.log('resize')
      this.app.renderer.resize(window.innerWidth, window.innerHeight);

      this.entityRenderer.resize(window.innerWidth, window.innerHeight);
      this.worldRenderer.resize(window.innerWidth, window.innerHeight);
    });
  }

  init = (session: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        this.networkManager.attachSession(session);
        await this.networkManager.init();

        const gameElem = document.getElementById('game');
        
        if (gameElem) {
          gameElem.appendChild(this.app.view);
        } else {
          console.log('Invalid game init');
        }

        this.app.ticker.add(this.tick);
        this.worldManager.init();
        this.inputManager.init();
        this.playerManager.init();
        
        this.worldRenderer.init();
        this.entityRenderer.init();
        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  destroy = (): Promise<void[]> => {
    return Promise.all([
      this.networkManager.destroy(),
    ]);
    // this.playerManager.destroy();
    // this.worldManager.destroy();
    // this.inputManager.destroy();
    // this.networkManager.destroy();

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

    this.worldRenderer.prepare();
    this.entityRenderer.prepare();

    this.worldRenderer.render();
    this.entityRenderer.render();
  };
}
