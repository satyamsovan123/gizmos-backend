/**
 * @file This file defines the authentication routes.
 */
import { signin, signup } from "../controllers/index.js";

import express from "express";

const authenticationRouter = express.Router();

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Signs in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful sign in
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
authenticationRouter.post("/signin", signin);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signs up a new user
 *     tags: [Authentication]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                minLength: 6
 *            required:
 *              - name
 *              - email
 *              - password
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
authenticationRouter.post("/signup", signup);

export { authenticationRouter };
