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
import { ResponseConstant } from "./app/constants/response.constant.js";
import { LoggerService } from "./app/services/logger.service.js";

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.errorResponseMiddleware = new ErrorResponseMiddleware();
    this.invalidRouteMiddleware = new InvalidRouteMiddleware();
    this.logger = new LoggerService();
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

  async start() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupNotFoundHandler();
    this.setupErrorHandlers();

    this.app.listen(this.port, () => {
      this.logger.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.start();
