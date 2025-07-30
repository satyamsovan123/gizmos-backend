import { API_RESPONSE } from "../../constants/index.js";
import { logger } from "../../services/index.js";
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
      body: Joi.object({}).messages({
        "object.unknown": API_RESPONSE.EXTRA_FIELDS_NOT_ALLOWED,
        "object.base": API_RESPONSE.INVALID_DATA,
      }),
    });

    await schema.validateAsync(
      {
        body: request.body,
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
 * Handles the get orders request.
 * @param {*} request - The incoming request object.
 * @returns {Promise<{ isValid: boolean, errors: string }>} response.
 * @throws {Error} - If validation fails, an error is thrown with status 400 and validation errors.
 * @throws {Error} - If an unexpected error occurs, it is logged and passed to the next middleware.
 */
async function getOrders(request, response, next) {
  try {
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      const error = new Error(validationResult.errors);
      error.status = 400;
      throw error;
    }

    return response.status(200).json({
      message: API_RESPONSE.ORDER.ORDER_LIST_FETCH_SUCCESS,
      data: null,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in get orders controller:", JSON.stringify(error));
    next(error || new Error(API_RESPONSE.ORDER.ORDER_LIST_FETCH_FAILURE));
  }
}

export { getOrders };
