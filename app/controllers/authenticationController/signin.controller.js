import { API_RESPONSE } from "../../constants/index.js";
import { User } from "../../models/index.js";
import { find, logger, update } from "../../services/index.js";
import Joi from "joi";
import { compareTextAndHash, generateTokens } from "./helper.js";

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
 * Handles the signin request.
 * Validates data -> Checks if email and password matches -> Generates tokens -> Save refresh token in database -> Sets refresh token in cookie -> Sets access token in header
 * @param {*} request - The incoming request object.
 * @returns {Promise<{ isValid: boolean, errors: string }>} response.
 * @throws {Error} - If validation fails, an error is thrown with status 400 and validation errors.
 * @throws {Error} - If an unexpected error occurs, it is logged and passed to the next middleware.
 */
async function signin(request, response, next) {
  try {
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      const error = new Error(validationResult.errors);
      error.status = 400;
      throw error;
    }

    const user = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    // Check if user exists
    const existingUser = (await find(User, { email: user.email }))[0];
    if (!existingUser) {
      const error = new Error(API_RESPONSE.AUTHENTICATION.SIGN_IN_FAILURE);
      error.status = 401;
      throw error;
    }

    // Check if password matches
    const isPasswordValid = await compareTextAndHash(
      user.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      const error = new Error(API_RESPONSE.AUTHENTICATION.SIGN_IN_FAILURE);
      error.status = 401;
      throw error;
    }

    // Generate tokens
    existingUser.password = undefined;
    existingUser.refreshToken = undefined;

    const tokens = generateTokens(existingUser);

    // Save refresh token in database
    update(
      User,
      { _id: existingUser._id },
      { refreshToken: tokens.refreshToken }
    );

    // Set refresh token in cookie
    response.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge:
        parseInt(
          process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN?.split("d")[0]
        ) *
        24 *
        60 *
        60 *
        1000, // 7 days in milliseconds
    });

    // Set access token in header
    response.setHeader("Authorization", `Bearer ${tokens.accessToken}`);

    return response.status(200).json({
      message: API_RESPONSE.AUTHENTICATION.SIGN_IN_SUCCESS,
      data: null,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in signin controller:", JSON.stringify(error));
    next(error || new Error(API_RESPONSE.AUTHENTICATION.SIGN_IN_FAILURE));
  }
}

export { signin };
