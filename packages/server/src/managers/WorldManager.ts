import { Manager } from './Manager';
import { game } from '../Game';

import { World, Entity } from '../world';

export class WorldManager extends Manager {
  private world: World;

  constructor() {
    super();
    this.world = new World();
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
  }

  update(delta: number): void {
    this.world.update(delta);
  }

  public getPlayerEntity = (login: string): Entity | null => {
    const playableEntity = this.world.playableEntities.get(login);

    if (!playableEntity) {
      return null;
    }

    const entity = this.world.entities.get(playableEntity.id);

    return entity;
  }
}