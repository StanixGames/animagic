"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const uuid_1 = require("uuid");
const schema_1 = require("@colyseus/schema");
const models_1 = require("../../models");
class State extends schema_1.Schema {
    constructor() {
        super();
        this.entities = new schema_1.MapSchema();
    }
    initialize() {
        // create some food entities
        for (let i = 0; i < 20; i++) {
            this.createEntity();
        }
    }
    createEntity() {
        const entity = new models_1.Entity(uuid_1.v4(), Math.random() * 100, Math.random() * 100, 0xbb3d3d);
        this.entities.set(entity.id, entity);
    }
    update(delta) {
    }
}
__decorate([
    schema_1.type({ map: models_1.Entity })
], State.prototype, "entities", void 0);
exports.State = State;
//# sourceMappingURL=State.js.map