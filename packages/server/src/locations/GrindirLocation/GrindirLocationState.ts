import {v4} from 'uuid';

import { game } from '../../Game';
import { AABB, Tile, Entity } from '../../models';

import { LocationState } from '../LocationState';

export class GrindirLocationState extends LocationState {
  constructor() {
    super('grindir');
  }

  init = () => {
    // let i = 0;
    // for (let x = 0; x < 50; x += 1) {
    //   for (let y = 0; y < 50; y += 1) {
    //     const tile = new Tile(x % 3, x, y);
    //     this.tiles.setAt(i, tile);
    //     i += 1;
    //   }
    // }
    //   const entity = new Entity(
    //     v4(),
    //     Math.random() * 40 - 20,
    //     Math.random() * 40 - 20,
    //     1,
    //     2,
    //     Math.random() * 0.5 - 0.2,
    //     Math.random() * 0.5 - 0.2,
    //     0xff22df
    //   )
    //   this.entities.set(entity.id, entity);
    // }
    game.persistManager.loadLocationState(this.id)
      .then((persistState) => {
        const { bounds, tiles, entities } = persistState;

        this.bounds = AABB.copy(bounds);

        let i = 0;
        tiles.forEach((tile) => {
          const schemaTile = Tile.copy(tile);
          this.tiles.setAt(i, schemaTile);
          i += 1;
        });

        entities.forEach((entity) => {
          const schemaEntity = Entity.copy(entity);
          this.entities.set(schemaEntity.id, schemaEntity);
        });
      })
      .catch((err) => {
        console.log('Cannot read state ', this.id, err);
      });

    game.worldManager.addState(this.id, this);
  };

  destroy = () => {
    console.log('destroy state ', this.id);
    
    game.persistManager.saveLocationState(this)
      .then(() => {
        console.log('Saved state ', this.id);
      })
      .catch(() => {
        console.log('Cannot save state', this.id);
      });
    game.worldManager.removeState(this.id);
  };
}
