import { WorldManager } from './managers';
import { NetworkManager } from './network';

class Game {
  private tickLengthMs = 1000 / 20;
  private previousTick = Date.now();

  readonly worldManager: WorldManager;

  constructor() {
    this.worldManager = new WorldManager();

    this.loop();
  }

  loop = () => {
    var now = Date.now()

    if (this.previousTick + this.tickLengthMs <= now) {
      var delta = (now - this.previousTick) / 1000;
      this.previousTick = now;

      this.update(delta);
    }

    if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
      setTimeout(this.loop)
    } else {
      setImmediate(this.loop)
    }
  }

  update = (delta: number) => {
    NetworkManager.update(delta);
    this.worldManager.update(delta);
  }

  destroy = () => {
    this.worldManager.destroy();
  }
}

export const game = new Game();
