import {v4} from 'uuid';
import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

import { AABB, Entity, Tile } from '../models';

export interface LocationPersistState {
  bounds: AABB;
  tiles: Array<Tile>;
  entities: Array<Entity>;
}

export abstract class LocationState extends Schema {
  readonly id: string;
  @type(AABB) bounds: AABB;
  @type([ Tile ]) tiles: ArraySchema<Tile>;
  @type({ map: Entity }) entities: MapSchema<Entity>;

  constructor(id: string) {
    super();

    this.bounds = new AABB(0, 0, 0, 0);
    this.tiles = new ArraySchema<Tile>();
    this.entities = new MapSchema<Entity>();
    this.id = id;
  }

  public abstract init(): any;
  public abstract destroy(): any;
}
