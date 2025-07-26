import { appEvent } from "../events/index.js";
import { logger } from "../services/index.js";

class SignupSubscriber {
  constructor() {
    appEvent.on("user.signup", this.handleUserSignup);
  }

  handleUserSignup = async (user) => {
    try {
      logger.log(
        `[user.signup]: Background tasks for ${user.email} completed.`,
        "EVENT"
      );
    } catch (error) {
      logger.log(
        `[user.signup]: Failed to process background tasks for ${user.email}: ${error.message}`,
        "EVENT"
      );
    }
  };
}

export { SignupSubscriber };
