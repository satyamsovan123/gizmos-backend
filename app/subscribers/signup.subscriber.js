import { appEventEmitter } from "../events/index.js";
import { logger } from "../services/index.js";

/**
 * This subscriber listens for the 'user.signup.success' event
 * and logs a message when the event is emitted.
 * It is used to handle post-signup actions such as sending a welcome email.
 */
const signupEvent = "user.signup.success";

appEventEmitter.on(signupEvent, (data) => {
  logger.info(`Signup email sent successfully: ${data.email}`);
});
