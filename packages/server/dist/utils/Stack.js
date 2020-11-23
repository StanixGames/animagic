"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class StackNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}
class Stack {
    constructor() {
        this.size = 0;
        this.top = null;
        this.bottom = null;
    }
    push(val) {
        const node = new StackNode(val);
        if (this.size === 0) {
            this.top = node;
            this.bottom = node;
        }
        else {
            const currentTop = this.top;
            this.top = node;
            this.top.next = currentTop;
        }
        this.size += 1;
        return this.size;
    }
    pop() {
        if (this.size > 0) {
            const nodeToBeRemove = this.top;
            this.top = nodeToBeRemove.next;
            this.size -= 1;
            nodeToBeRemove.next = null;
            return nodeToBeRemove;
        }
        return null;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map