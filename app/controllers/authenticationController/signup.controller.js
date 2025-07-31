import { API_RESPONSE } from "../../constants/index.js";
import { create, find, logger } from "../../services/index.js";
import { appEventEmitter } from "../../events/index.js";
import Joi from "joi";
import { User } from "../../models/index.js";
import { generateTokens, hashText } from "./helper.js";

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
        name: Joi.string()
          .min(1)
          .required()
          .messages({
            "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Name"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Name"
            ),
          }),
        email: Joi.string()
          .email()
          .min(1)
          .required()
          .messages({
            "string.email": API_RESPONSE.FIELD_IS_INVALID.replace(
              "Field",
              "Email"
            ),
            "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Email"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Email"
            ),
          }),
        password: Joi.string()
          .min(6)
          .required()
          .messages({
            "string.min": API_RESPONSE.FIELD_IS_INVALID.replace(
              "Field",
              "Password"
            ),
            "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Password"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Password"
            ),
          }),
      }).messages({
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
 * Handles the signup request.
 * Validates data -> Checks if user exists -> Encrypts password -> Creates user -> Emits event
 * @param {*} request - The incoming request object.
 * @param {*} response - The outgoing response object.
 * @param {*} next - The next middleware function.
 * @returns {Promise<void>} response.
 * @throws {Error} - If validation fails, an error is thrown with status 400 and validation errors.
 * @throws {Error} - If an unexpected error occurs, it is logged and passed to the next middleware.
 */
async function signup(request, response, next) {
  try {
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      return response.status(400).json({
        status: 400,
        message: validationResult.errors,
      });
    }

    const user = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    // Check if user already exists
    const existingUser = await find(User, {
      email: user.email,
    });

    if (existingUser.length > 0) {
      const errorMessage = API_RESPONSE.USER.USER_EXISTS;
      const error = new Error(errorMessage);
      error.status = 409;
      return next(error);
    }

    // Encrypt password before saving
    user.password = await hashText(user.password);

    const createdUser = await create(User, user);

    if (!createdUser) {
      const errorMessage = API_RESPONSE.AUTHENTICATION.SIGN_UP_FAILURE;
      const error = new Error(errorMessage);
      error.status = 500;
      return next(error);
    }

    // Remove sensitive data from response
    createdUser.password = undefined;
    createdUser.refreshToken = undefined;

    // Emit signup event
    appEventEmitter.emit("user.signup.success", createdUser);

    return response.status(200).json({
      message: API_RESPONSE.AUTHENTICATION.SIGN_UP_SUCCESS,
      data: createdUser,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in signup controller:", JSON.stringify(error));
    next(error || new Error(API_RESPONSE.AUTHENTICATION.SIGN_UP_FAILURE));
  }
}

export { signup };
