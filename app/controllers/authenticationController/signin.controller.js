import {
  SuccessResponseMiddleware,
  ErrorResponseMiddleware,
} from "../../middlewares/index.js";

class SigninController {
  constructor() {}

  async validateData(request) {}

  async signin(request, response, next) {
    try {
      const responseData = new SuccessResponseMiddleware();
      responseData.send(request, response);
    } catch (error) {
      error.message =
        error.message ||
        "Some error occured for signin route. Please try again later.";
      return next(error);
    }
  }
}

export { SigninController };
