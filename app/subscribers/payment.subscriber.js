import { appEventEmitter } from "../events/index.js";
import { logger } from "../services/index.js";

/**
 * This is the payment success event listener.
 * It listens for the 'user.payment.success' event
 * and logs a message when the event is emitted.
 * This can be used to handle post-payment actions such as updating user status or sending notifications.
 */
const paymentEvent = "user.payment.success";

appEventEmitter.on(paymentEvent, (data) => {
  logger.info(`Payment successful: ${data}`);
});
