/**
 * @file This is the main entry point of the application.
 * It sets up the Express server, middleware, and routes.
 * It also configures Swagger documentation and error handling.
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { SERVER_ERROR_RESPONSE } from "./app/constants/index.js";
import { router } from "./app/routes/index.js";
import { errorResponseHandler } from "./app/middlewares/index.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { documentationOptions } from "./app/configs/index.js";

import "./app/subscribers/signup.subscriber.js";
import "./app/subscribers/payment.subscriber.js";

dotenv.config();
const app = express();

// Trust first proxy for rate limiting
app.set("trust proxy", 1);

// Middleware setup
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // 100 requests minute
    message: SERVER_ERROR_RESPONSE.TOO_MANY_REQUESTS,
    standardHeaders: true,
  })
);

// Swagger documentation setup
const swaggerDocs = swaggerJsdoc(documentationOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes setup
app.use("/api/v1", router);
app.use(errorResponseHandler);

export { app };
