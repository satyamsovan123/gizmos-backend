/**
 * @file This file defines the discount routes.
 */
import {
  getDiscounts,
  editDiscount,
  deleteDiscount,
  createDiscount,
} from "../controllers/index.js";

import express from "express";
import { accessTokenAndHandler } from "../middlewares/index.js";

const discountRouter = express.Router();

/**
 * @swagger
 * /discount/all:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: Successful retrieval of discounts
 *       404:
 *         description: Discounts not found
 */
discountRouter.get("/all", getDiscounts);

/**
 * @swagger
 * /discount/create:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Successful creation of discount
 *       400:
 *         description: Invalid request
 */
discountRouter.post("/create", accessTokenAndHandler, createDiscount);

/**
 * @swagger
 * /discount/{id}:
 *   put:
 *     summary: Edit an existing discount
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the discount to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Successful update of discount
 *       404:
 *         description: Discount not found
 */
discountRouter.put("/:id", accessTokenAndHandler, editDiscount);

/**
 * @swagger
 * /discount/{id}:
 *   delete:
 *     summary: Delete an existing discount
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the discount to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful deletion of discount
 *       404:
 *         description: Discount not found
 */
discountRouter.delete("/:id", accessTokenAndHandler, deleteDiscount);

export { discountRouter };
