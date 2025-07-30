import { EventEmitter } from "events";

/**
 * This is the event emitter for the application.
 * It is used to handle and emit application-wide events.
 */
const appEventEmitter = new EventEmitter();

export { appEventEmitter };
