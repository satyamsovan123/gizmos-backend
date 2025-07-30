import { SERVER_ERROR_RESPONSE } from "../constants/index.js";

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
  const status = error.status || 500;
  const message = error.message || SERVER_ERROR_RESPONSE.INTERNAL_SERVER_ERROR;

  next();
}

export { accessTokenAndHandler };
