import { Schema, type } from "@colyseus/schema";

enum TileType {
  DIRT = 0,
  GRASS = 1,
  SAND = 2,
}

export class Tile extends Schema {
  public static Type = TileType; 

  @type("number") type: TileType;
  @type("number") x: number;
  @type("number") y: number;

  constructor(
    type: TileType,
    x: number,
    y: number,
  ) {
    super();

    this.type = type;
    this.x = x;
    this.y = y;
  }

  public static copy = (tile: Tile): Tile => {
    return new Tile(
      tile.type,
      tile.x,
      tile.y,
    );
  }
}
