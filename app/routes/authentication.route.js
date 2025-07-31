/**
 * @file This file defines the authentication routes.
 */
import { signin, signup } from "../controllers/index.js";

import express from "express";

const authenticationRouter = express.Router();

/**
 * @swagger
 * paths:
 *   /auth/signin:
 *     post:
 *       summary: "Signs in a user and returns tokens"
 *       description: |
 *         This endpoint authenticates a user and returns an access token in the
 *         Authorization header and a refresh token in a secure, httpOnly cookie.
 *         No authentication is required to access this endpoint.
 *       tags:
 *         - Authentication
 *       security: []  # No authentication required
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "test@example.com"
 *                 password:
 *                   type: string
 *                   minLength: 6
 *                   example: "password123"
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: |
 *             Sign-in successful. The access token is returned in the Authorization
 *             header and the refresh token is set in an httpOnly cookie.
 *           headers:
 *             Authorization:
 *               description: The Bearer access token for subsequent authenticated requests.
 *               schema:
 *                 type: string
 *               example: "Bearer eyJhbGciOiJI..."
 *             Set-Cookie:
 *               description: Contains the httpOnly refresh token.
 *               schema:
 *                 type: string
 *               example: >
 *                 refreshToken=eyJhbGciOiJI...; Path=/; HttpOnly; Secure; SameSite=Strict
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Signin successful."
 *                   data:
 *                     type: object
 *                     nullable: true
 *                     example: null
 *                   status:
 *                     type: integer
 *                     example: 200
 *         '400':
 *           description: >-
 *             Bad Request – The request body is missing required fields or contains
 *             invalid data.
 *         '401':
 *           description: >-
 *             Unauthorized – The provided email or password is incorrect.
 */

authenticationRouter.post("/signin", signin);

/**
 * @swagger
 * paths:
 *   /auth/signup:
 *     post:
 *       summary: "Signs up (registers) a new user"
 *       description: |
 *         This endpoint creates a new user account. No authentication is
 *         required to access this endpoint.
 *       tags:
 *         - Authentication
 *       security: []  # No authentication required
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   minLength: 6
 *                   example: "password123"
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: |
 *             User created successfully. The new user object is returned in the response.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Signup successful."
 *                   data:
 *                     $ref: '#/components/schemas/User'
 *                   status:
 *                     type: integer
 *                     example: 200
 *         '400':
 *           description: >-
 *             Bad Request – The request body is missing required fields or contains
 *             invalid data.
 *         '409':
 *           description: >-
 *             Conflict – A user with the provided email already exists.
 *         '500':
 *           description: >-
 *             Internal Server Error – An unexpected error occurred during user creation.
 */
authenticationRouter.post("/signup", signup);

export { authenticationRouter };
