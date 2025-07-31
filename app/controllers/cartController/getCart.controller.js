import { API_RESPONSE } from "../../constants/index.js";
import { Cart } from "../../models/index.js";
import { create, findOne, logger } from "../../services/index.js";
import Joi from "joi";

/**
 * Validates the incoming request data.
 * @param {*} request - The incoming request object.
 * @returns {Promise<{ isValid: boolean, errors: string }>} object containing validation result.
 */
async function validateData(request) {
  let validationResult = { isValid: true, errors: "" };
  try {
    const schema = Joi.object({
      body: Joi.object({}),
      user: Joi.object({}).required().unknown(true),
    }).messages({
      "object.unknown": API_RESPONSE.EXTRA_FIELDS_NOT_ALLOWED,
      "object.base": API_RESPONSE.INVALID_DATA,
    });

    await schema.validateAsync(
      {
        body: request.body,
        user: request.user,
      },
      {
        abortEarly: false,
      }
    );
  } catch (error) {
    const errorMessage = `${[
      ...new Set(error.details.map((detail) => detail.message)),
    ].join(" ")}`;
    validationResult = { isValid: false, errors: errorMessage };
  }
  return validationResult;
}

/**
 * Handles the get cart request.
 * @param {*} request - The incoming request object.
 * @returns {Promise<{ isValid: boolean, errors: string }>} response.
 * @throws {Error} - If validation fails, an error is thrown with status 400 and validation errors.
 * @throws {Error} - If an unexpected error occurs, it is logged and passed to the next middleware.
 */
async function getCart(request, response, next) {
  try {
    // Validate the request data
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      return response.status(400).json({
        message: API_RESPONSE.INVALID_DATA,
        errors: validationResult.errors,
        status: 400,
      });
    }
    const userId = request.user._id;

    // Find the user's cart and populate the product details for each item.
    let cart = await findOne(Cart, { user: userId, status: "active" });

    // If the user doesn't have a cart, create one.
    if (!cart) {
      cart = await create(Cart, { user: userId, items: [] });
    }

    return response.status(200).json({
      message: API_RESPONSE.CART.CART_FETCH_SUCCESS,
      data: cart,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in get cart controller:", JSON.stringify(error));
    next(error || new Error(API_RESPONSE.CART.CART_FETCH_FAILURE));
  }
}

export { getCart };
