import { SERVER_ERROR_RESPONSE } from "../constants/index.js";

async function errorResponseHandler(error, request, response, next) {
  const status = error.status || 500;
  const message = error.message || SERVER_ERROR_RESPONSE.INTERNAL_SERVER_ERROR;

  return response.status(status).json({
    status: status,
    message: message,
    data: null,
  });

  // next();
}

export { errorResponseHandler };
