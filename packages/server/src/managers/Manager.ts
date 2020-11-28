export abstract class Manager {
  abstract init(): Promise<void>;
  abstract destroy(): Promise<void>;
}