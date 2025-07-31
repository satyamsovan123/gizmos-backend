import { SERVER_ERROR_RESPONSE } from "../constants/index.js";
import { API_RESPONSE } from "../constants/index.js";
import { User } from "../models/index.js";
import { findOne } from "../services/index.js";
import jwt from "jsonwebtoken";

/**
 * This middleware function handles access token and role validation.
 * It validates the access token and checks if the user has the required role.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 * @param {*} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves to a JSON response with the error details.
 */
async function accessTokenAndHandler(request, response, next) {
  const accessToken = request.headers.authorization;
  const refreshToken = request.cookies.refreshToken;
  if (!accessToken || !accessToken.startsWith("Bearer ")) {
    return response.status(401).json({
      message: API_RESPONSE.AUTHENTICATION.TOKEN_INVALID,
      status: 401,
      data: null,
    });
  }

  // Extract the token from the header
  const token = accessToken.split(" ")[1];

  // Verify the token
  let decodedPayload;
  try {
    decodedPayload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  } catch (error) {
    return response.status(401).json({
      message: API_RESPONSE.AUTHENTICATION.TOKEN_INVALID,
      status: 401,
      data: null,
    });
  }

  // Find the user from the database using the ID from the token payload
  const user = await findOne(User, {
    _id: decodedPayload._id,
    refreshToken: refreshToken,
  });
  if (!user) {
    return response.status(401).json({
      message: API_RESPONSE.AUTHENTICATION.USER_NOT_FOUND,
      status: 401,
      data: null,
    });
  }

  // Remove sensitive information
  user.refreshToken = undefined;
  user.password = undefined;

  request.user = user;

  next();
}

export { accessTokenAndHandler };
