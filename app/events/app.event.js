import { EventEmitter } from "events";

class AppEvent {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  on(event, listener) {
    this.eventEmitter.on(event, listener);
  }

  emit(event, ...args) {
    this.eventEmitter.emit(event, ...args);
  }
}

export { AppEvent };
