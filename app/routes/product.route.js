/**
 * @file This file defines the product routes.
 */
import {
  getProduct,
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/index.js";

import express from "express";
import { accessTokenAndHandler } from "../middlewares/index.js";

const productRouter = express.Router();

/**
 * @swagger
 * /product/{id}:
 *   get:
 *      summary: Get product by ID
 *      description: Retrieve a product by its unique ID.
 *      tags: [Product]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the product to retrieve
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Product retrieved successfully
 *        404:
 *          description: Product not found with the provided ID
 */
productRouter.get("/:id", getProduct);

/**
 * @swagger
 * /product/all:
 *   get:
 *      summary: Get all products
 *      description: Retrieve a list of all products.
 *      tags: [Product]
 *      responses:
 *        200:
 *          description: List of products retrieved successfully
 */
productRouter.get("/all", getProducts);

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product.
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRouter.post("/create", accessTokenAndHandler, createProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *      summary: Update product by ID
 *      description: Update a product by its unique ID.
 *      tags: [Product]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the product to update
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Product updated successfully
 *        404:
 *          description: Product not found with the provided ID
 */
productRouter.put("/:id", accessTokenAndHandler, editProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete an existing product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful deletion of product
 *       404:
 *         description: Product not found
 */
productRouter.delete("/:id", accessTokenAndHandler, deleteProduct);

export { productRouter };
