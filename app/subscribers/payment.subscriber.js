import { appEventEmitter } from "../events/index.js";
import { logger } from "../services/index.js";

const eventName = "user.payment.success";

appEventEmitter.on(eventName, (data) => {
  logger.info(`Payment successful: ${data}`);
});
