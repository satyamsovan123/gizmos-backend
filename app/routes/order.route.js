/**
 * @file This file defines the order routes.
 */
import {
  getOrder,
  getOrders,
  createOrder,
  cancelOrder,
  refundOrder,
  editSubscription,
  createSubscription,
  cancelSubscription,
} from "../controllers/index.js";

import express from "express";

const orderRouter = express.Router();

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 */
orderRouter.post("/create", createOrder);

/**
 * @swagger
 * /order/all:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Successful retrieval of orders
 *       404:
 *         description: Orders not found
 */
orderRouter.get("/all", getOrders);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *      summary: Get order by ID
 *      description: Retrieve an order by its unique ID.
 *      tags: [Order]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the order to retrieve
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Order retrieved successfully
 *        404:
 *          description: Order not found with the provided ID
 */
orderRouter.get("/:id", getOrder);

/**
 * @swagger
 * /order/{id}/edit-subscription:
 *   put:
 *     summary: Edit an existing subscription
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to edit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription edited successfully
 *       404:
 *         description: Subscription not found with the provided ID
 */
orderRouter.put("/:id", editSubscription);

/**
 * @swagger
 * /order/{id}/cancel-subscription:
 *   delete:
 *     summary: Cancel an existing subscription
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to cancel subscription
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *       404:
 *         description: Subscription not found with the provided ID
 */
orderRouter.delete("/:id", cancelSubscription);

/**
 * @swagger
 * /order/{id}/refund:
 *   post:
 *     summary: Request a refund for an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to refund
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refund requested successfully
 *       404:
 *         description: Order not found with the provided ID
 */
orderRouter.post("/:id/refund", refundOrder);

/**
 * @swagger
 * /order/{id}/cancel:
 *   delete:
 *     summary: Cancel an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to cancel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       404:
 *         description: Order not found with the provided ID
 */
orderRouter.delete("/:id/cancel", cancelOrder);

/**
 * @swagger
 * /order/{id}/subscribe:
 *   post:
 *     summary: Subscribe to an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to subscribe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription created successfully
 *       404:
 *         description: Order not found with the provided ID
 */
orderRouter.post("/:id/subscribe", createSubscription);

export { orderRouter };
