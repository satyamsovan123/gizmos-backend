/**
 * @file This file defines the cart routes.
 */
import { getCart, editCart } from "../controllers/index.js";

import express from "express";
import { accessTokenAndHandler } from "../middlewares/index.js";

const cartRouter = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the authenticated user's cart
 *     description: >
 *       Retrieves the active cart for the currently logged-in user.
 *       The user is identified by the Bearer token. If no active cart exists, the data field will be null.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart fetched successfully."
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/Cart'
 *                     - type: object
 *                       nullable: true
 *                       example: null
 *                 status:
 *                   type: integer
 *                   example: 200
 *       '400':
 *         description: Bad Request - The request is malformed.
 *       '401':
 *         description: Unauthorized - User is not authenticated.
 */
cartRouter.get("/", accessTokenAndHandler, getCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update the user's cart
 *     description: >
 *       Replaces the entire list of items in the user's cart with the new list provided.
 *       The user is identified by the Bearer token. This is a full replacement.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 description: The complete new list of items in the cart.
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: The MongoDB ObjectId of the product.
 *                       example: "60d0fe4f5311236168a109ca"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 2
 *     responses:
 *       '200':
 *         description: Cart updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *                 status:
 *                   type: integer
 *                   example: 200
 *       '400':
 *         description: Bad Request - invalid or missing required fields.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '404':
 *         description: Not Found - an active cart for the user was not found.
 *       '500':
 *         description: Internal Server Error.
 */
cartRouter.put("/", accessTokenAndHandler, editCart);

export { cartRouter };
