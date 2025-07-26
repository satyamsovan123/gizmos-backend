import { ResponseConstant } from "../constants/index.js";

class SuccessResponseMiddleware {
  constructor() {}

  send(request, response, data = null) {
    const statusCode = response.statusCode || 200;
    const message =
      response.statusMessage || ResponseConstant.api.genericSuccess;

    return response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
      error: false,
    });
  }
}

export { SuccessResponseMiddleware };
