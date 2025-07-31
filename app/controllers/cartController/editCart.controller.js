import { API_RESPONSE } from "../../constants/index.js";
import { Cart } from "../../models/index.js";
import { logger, update } from "../../services/index.js";
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
      body: Joi.object({
        items: Joi.array()
          .items(
            Joi.object({
              product: Joi.string()
                .required()
                .messages({
                  "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
                    "Field",
                    "Product ID"
                  ),
                  "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
                    "Field",
                    "Product ID"
                  ),
                }),
              quantity: Joi.number()
                .min(1)
                .required()
                .messages({
                  "number.min": API_RESPONSE.FIELD_IS_INVALID.replace(
                    "Field",
                    "Quantity"
                  ),
                  "number.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
                    "Field",
                    "Quantity"
                  ),
                  "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
                    "Field",
                    "Quantity"
                  ),
                }),
            })
          )
          .required()
          .messages({
            "array.base": API_RESPONSE.FIELD_IS_INVALID.replace(
              "Field",
              "Items"
            ),
            "array.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Items"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Items"
            ),
          }),
      }),
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
 * Handles the edit cart request.
 * @param {*} request - The incoming request object.
 * @returns {Promise<{ isValid: boolean, errors: string }>} response.
 * @throws {Error} - If validation fails, an error is thrown with status 400 and validation errors.
 * @throws {Error} - If an unexpected error occurs, it is logged and passed to the next middleware.
 */
async function editCart(request, response, next) {
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
    const { items } = request.body;

    const updatedCart = await update(
      Cart,
      { user: userId, status: "active" },
      { items }
    );

    return response.status(200).json({
      message: API_RESPONSE.CART.CART_UPDATE_SUCCESS,
      data: updatedCart,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in edit cart controller:", JSON.stringify(error));
    next(error || new Error(API_RESPONSE.CART.CART_UPDATE_FAILURE));
  }
}

export { editCart };
