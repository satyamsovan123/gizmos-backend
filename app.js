import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { AuthenticationRoute } from "./app/routes/index.js";
import {
  ErrorResponseMiddleware,
  InvalidRouteMiddleware,
} from "./app/middlewares/index.js";
import { ResponseConstant } from "./app/constants/index.js";
import { logger } from "./app/services/index.js";
import { DatabaseConfig } from "./app/configs/index.js";
import { SignupSubscriber } from "./app/subscribers/index.js";

dotenv.config();

process.on("unhandledRejection", (reason, promise) => {
  logger.log(`Unhandled Rejection at: ${promise}, reason: ${reason}`, "ERROR");
});

process.on("uncaughtException", (error) => {
  logger.log(`Uncaught Exception: ${error.message}`, "ERROR");
  logger.log(error.stack, "ERROR");
  process.exit(1);
});

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.errorResponseMiddleware = new ErrorResponseMiddleware();
    this.invalidRouteMiddleware = new InvalidRouteMiddleware();
    this.logger = logger;
  }

  setupSubscribers() {
    new SignupSubscriber();
  }

  setupMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 100, // 100 requests per windowMs
        message: ResponseConstant.api.tooManyRequests,
      })
    );
  }

  setupNotFoundHandler() {
    this.app.use(
      this.invalidRouteMiddleware.send.bind(this.invalidRouteMiddleware)
    );
  }

  setupErrorHandlers() {
    this.app.use(
      this.errorResponseMiddleware.send.bind(this.errorResponseMiddleware)
    );
  }

  setupRoutes() {
    const authenticationRoute = new AuthenticationRoute();
    this.app.use(
      ResponseConstant.api.version,
      authenticationRoute.authenticationRouter
    );
  }

  async setupDatabase() {
    const databaseConfig = new DatabaseConfig(process.env.DATABASE_URL);
    await databaseConfig.connect();
    this.logger.log(`Database connected successfully`);
  }

  async start() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupNotFoundHandler();
    this.setupErrorHandlers();

    await this.setupDatabase();
    this.setupSubscribers();

    this.app.listen(this.port, () => {
      this.logger.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.start();
