import { appEventEmitter } from "../events/index.js";
import { logger } from "../services/index.js";

const eventName = "user.signup.success";

appEventEmitter.on(eventName, (data) => {
  logger.info(`Email sent successfully: ${data.email}`);
});
