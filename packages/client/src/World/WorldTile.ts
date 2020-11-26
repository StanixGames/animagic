export type WorldTileMaterial =
  | 'grass'
  | 'sand';

export class WorldTile {
  readonly x: number;
  readonly y: number;
  readonly material: WorldTileMaterial;

  constructor(x: number, y: number, material: WorldTileMaterial) {
    this.x = x;
    this.y = y;
    this.material = material;
  }
}