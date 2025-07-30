/**
 * @file This file defines the user routes.
 */
import { getUser, editUser } from "../controllers/index.js";

import express from "express";
import { accessTokenAndHandler } from "../middlewares/index.js";

const userRouter = express.Router();

/**
 * @swagger
 * /user/{id}:
 *   get:
 *      summary: Get user by ID
 *      description: Retrieve a user by their unique ID.
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to retrieve
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User retrieved successfully
 *        404:
 *          description: User not found with the provided ID
 */
userRouter.get("/:id", accessTokenAndHandler, getUser);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update user by ID
 *     description: Update a user by their unique ID.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found with the provided ID
 */
userRouter.patch("/:id", accessTokenAndHandler, editUser);

export { userRouter };
