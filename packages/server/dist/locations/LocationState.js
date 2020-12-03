"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationState = void 0;
const schema_1 = require("@colyseus/schema");
const models_1 = require("../models");
class LocationState extends schema_1.Schema {
    constructor(id) {
        super();
        this.bounds = new models_1.AABB(0, 0, 0, 0);
        this.tiles = new schema_1.ArraySchema();
        this.entities = new schema_1.MapSchema();
        this.id = id;
    }
}
__decorate([
    schema_1.type(models_1.AABB)
], LocationState.prototype, "bounds", void 0);
__decorate([
    schema_1.type([models_1.Tile])
], LocationState.prototype, "tiles", void 0);
__decorate([
    schema_1.type({ map: models_1.Entity })
], LocationState.prototype, "entities", void 0);
exports.LocationState = LocationState;
//# sourceMappingURL=LocationState.js.map