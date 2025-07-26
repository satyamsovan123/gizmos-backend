import { ResponseConstant } from "../constants/index.js";

class InvalidRouteMiddleware {
  constructor() {}

  send(request, response, data = null) {
    const statusCode = 404;
    const message = ResponseConstant.api.invalidApiPath;

    if (
      request.originalUrl === ResponseConstant.api.version + "/" &&
      request.method === "GET"
    ) {
      return response.status(200).json({
        statusCode: 200,
        message: ResponseConstant.api.backendRunning,
        data: null,
        error: false,
      });
    }

    return response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
      error: true,
    });
  }
}

export { InvalidRouteMiddleware };
