/**
 * @file This file defines the main router for the application.
 * It handles the root route and integrates all other routes.
 * The router is responsible for routing requests to the appropriate controllers.
 * It also provides a fallback for undefined routes.
 */
import express from "express";

import { API_RESPONSE, SERVER_ERROR_RESPONSE } from "../constants/index.js";
import { authenticationRouter } from "./authentication.route.js";
import { cartRouter } from "./cart.route.js";
import { discountRouter } from "./discount.route.js";
import { orderRouter } from "./order.route.js";
import { productRouter } from "./product.route.js";
import { userRouter } from "./user.route.js";
import { paymentRouter } from "./payment.route.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: API_RESPONSE.API_OPERATIONAL });
});

router.use("/auth", authenticationRouter);
router.use("/cart", cartRouter);
router.use("/discount", discountRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/payment", paymentRouter);

router.use(/(.*)/, (req, res) => {
  res.status(404).json({ message: SERVER_ERROR_RESPONSE.NOT_FOUND });
});

export { router };
