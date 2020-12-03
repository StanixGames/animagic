import {
  LocationManager,
  WorldManager,
  PersistManager,
  GeneratorManager,
} from './managers';

class Game {
  private tickLengthMs = 1000 / 10;
  private previousTick = Date.now();

  readonly locationManager: LocationManager;
  readonly worldManager: WorldManager;
  readonly persistManager: PersistManager;
  readonly generatorManager: GeneratorManager;

  constructor() {
    this.locationManager = new LocationManager();
    this.worldManager = new WorldManager();
    this.persistManager = new PersistManager();
    this.generatorManager = new GeneratorManager();

    this.init();
  }

  init = async () => {
    await this.locationManager.init();
    await this.worldManager.init();
    await this.persistManager.init();
    await this.generatorManager.init();

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
    this.locationManager.update(delta);
    this.worldManager.update(delta);
  }

  destroy = async () => {
    await Promise.all([
      this.locationManager.destroy(),
      this.worldManager.destroy(),
      this.persistManager.destroy(),
      this.generatorManager.destroy(),
    ]);
  }
}

export const game = new Game();
