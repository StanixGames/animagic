"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const schema_1 = require("@colyseus/schema");
const ENTITY_MAX_SPEED = 2;
class Entity extends schema_1.Schema {
    constructor(id, x, y, width, height, velX, velY, color) {
        super();
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = velX;
        this.velY = velY;
        this.maxSpeed = ENTITY_MAX_SPEED;
        this.color = color;
    }
}
Entity.from = (entity) => {
    return new Entity(entity.id, entity.x, entity.y, entity.width, entity.height, entity.velX, entity.velY, entity.color);
};
__decorate([
    schema_1.type("string")
], Entity.prototype, "id", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "width", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "height", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "velX", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "velY", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "maxSpeed", void 0);
__decorate([
    schema_1.type("number")
], Entity.prototype, "color", void 0);
exports.Entity = Entity;
//# sourceMappingURL=Entity%20copy.js.map