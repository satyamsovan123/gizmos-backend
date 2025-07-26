import { ResponseConstant } from "../constants/index.js";
class ErrorResponseMiddleware {
  constructor() {}

  send(error, request, response, next) {
    const statusCode = error.statusCode || 500;
    const message = error.message || ResponseConstant.api.genericError;

    console.error(error.stack);

    return response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: null,
      error: true,
    });
  }
}

export { ErrorResponseMiddleware };
