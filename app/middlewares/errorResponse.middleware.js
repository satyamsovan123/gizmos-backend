import { SERVER_ERROR_RESPONSE } from "../constants/index.js";

/**
 * This middleware function handles errors globally that occur in the application.
 * It captures the error, sets the appropriate status code,
 * and returns a standardized JSON response.
 *
 * @param {*} error - The error object that was thrown.
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 * @param {*} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves to a JSON response with the error details.
 */
async function errorResponseHandler(error, request, response, next) {
  const status = error.status || 500;
  const message = error.message || SERVER_ERROR_RESPONSE.INTERNAL_SERVER_ERROR;

  return response.status(status).json({
    status: status,
    message: message,
    data: null,
  });
}

export { errorResponseHandler };
