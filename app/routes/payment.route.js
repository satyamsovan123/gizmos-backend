/**
 * @file This file defines the payment routes.
 */
import { getPaymentLink } from "../controllers/index.js";

import express from "express";
import { accessTokenAndHandler } from "../middlewares/index.js";

const paymentRouter = express.Router();

/**
 * @swagger
 * /payment/link:
 *  post:
 *      summary: Get payment link
 *      tags: [Payment]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *
 *      responses:
 *          200:
 *              description: Successful retrieval of payment link
 *          404:
 *              description: Payment link not found
 */
paymentRouter.post("/link", accessTokenAndHandler, getPaymentLink);

export { paymentRouter };
