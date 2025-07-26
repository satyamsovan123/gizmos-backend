import { LoggerService } from "./logger.service.js";
import { DatabaseService } from "./database.service.js";

const logger = new LoggerService();
export { logger, DatabaseService };
