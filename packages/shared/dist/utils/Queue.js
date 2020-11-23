"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor() {
        this._store = [];
    }
    push(val) {
        this._store.push(val);
    }
    pop() {
        return this._store.shift();
    }
    size() {
        return this._store.length;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map