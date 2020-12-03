"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const schema_1 = require("@colyseus/schema");
var TileType;
(function (TileType) {
    TileType[TileType["DIRT"] = 0] = "DIRT";
    TileType[TileType["GRASS"] = 1] = "GRASS";
    TileType[TileType["SAND"] = 2] = "SAND";
})(TileType || (TileType = {}));
class Tile extends schema_1.Schema {
    constructor(type, x, y) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
    }
}
Tile.Type = TileType;
Tile.copy = (tile) => {
    return new Tile(tile.type, tile.x, tile.y);
};
__decorate([
    schema_1.type("number")
], Tile.prototype, "type", void 0);
__decorate([
    schema_1.type("number")
], Tile.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Tile.prototype, "y", void 0);
exports.Tile = Tile;
//# sourceMappingURL=Tile.js.map