export declare class Queue<T> {
    _store: T[];
    push(val: T): void;
    pop(): T | undefined;
    size(): number;
}
