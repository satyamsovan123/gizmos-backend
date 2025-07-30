/**
 * @file This file defines the cart routes.
 */
import { getCart, editCart } from "../controllers/index.js";

import express from "express";

const cartRouter = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *     responses:
 *       200:
 *         description: Successful retrieval of cart
 *       404:
 *         description: Cart not found
 */
cartRouter.get("/:id", getCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Edit the user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *     responses:
 *       200:
 *         description: Successful cart update
 *       400:
 *         description: Invalid request
 */
cartRouter.put("/:id", editCart);

export { cartRouter };
