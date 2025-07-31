import jwt from "jsonwebtoken";
import { API_RESPONSE } from "../../constants/index.js";
import { User } from "../../models/index.js";
import { findOne, update } from "../../services/index.js";
import { generateTokens } from "./helper.js";
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
 * Handles the token refresh request.
 * It verifies the refresh token from the cookie, checks it against the database,
 * and issues a new access token (and optionally a new refresh token).
 * @param {object} request - The Express request object.
 * @param {object} response - The Express response object.
 * @param {function} next - The next middleware function.
 */
async function refreshTokenHandler(request, response, next) {
  try {
    // Validate that the request body is empty
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      return response.status(400).json({
        message: validationResult.errors,
        status: 400,
        data: null,
      });
    }

    // Get the refresh token from the httpOnly cookie
    const incomingRefreshToken = request.cookies.refreshToken;
    if (!incomingRefreshToken) {
      return response.status(401).json({
        message: API_RESPONSE.AUTHENTICATION.TOKEN_INVALID,
        status: 401,
        data: null,
      });
    }

    // Verify the token's signature and expiration
    let decodedPayload;
    try {
      decodedPayload = jwt.verify(
        incomingRefreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      return response.status(401).json({
        message: API_RESPONSE.AUTHENTICATION.TOKEN_INVALID,
        status: 401,
        data: null,
      });
    }

    // Find the user and validate the token against the one stored in the DB
    const user = await findOne(User, { _id: decodedPayload._id });

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return response.status(401).json({
        message: API_RESPONSE.AUTHENTICATION.TOKEN_INVALID,
        status: 401,
        data: null,
      });
    }

    // Remove sensitive fields
    user.password = undefined;

    // Generate a new set of tokens.
    const newTokens = generateTokens(user);

    // Update the new refresh token in the database
    await update(
      User,
      { _id: user._id },
      { refreshToken: newTokens.refreshToken }
    );

    // Set the new refresh token in the cookie
    response.cookie("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Set the new access token in the header
    response.set("Authorization", `Bearer ${newTokens.accessToken}`);

    // Send the new access token in the response body
    return response.status(200).json({
      message: "Tokens refreshed successfully.",
      data: null,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
}

export { refreshTokenHandler };
