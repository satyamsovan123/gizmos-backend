import Joi from "joi";
import { ResponseConstant } from "../../constants/index.js";
import { SuccessResponseMiddleware } from "../../middlewares/index.js";
import { DatabaseService } from "../../services/index.js";
import { User } from "../../models/index.js";
import { logger } from "../../services/index.js";
import { appEvent } from "../../events/index.js";
class SignupController {
  constructor() {}

  async validateRequest(request) {
    let validationResult = { isValid: true, errors: "" };
    try {
      const schema = Joi.object({
        body: Joi.object({
          name: Joi.string()
            .min(1)
            .required()
            .messages({
              "string.min": ResponseConstant.validation.minLength("Name", 1),
              "string.empty": ResponseConstant.validation.isEmpty("Name"),
              "any.required": ResponseConstant.validation.isRequired("Name"),
            }),
          email: Joi.string()
            .email()
            .min(1)
            .required()
            .messages({
              "string.email": ResponseConstant.validation.isInvalid("Email"),
              "string.empty": ResponseConstant.validation.isEmpty("Email"),
              "any.required": ResponseConstant.validation.isRequired("Email"),
            }),
          password: Joi.string()
            .min(6)
            .required()
            .messages({
              "string.min": ResponseConstant.validation.minLength(
                "Password",
                6
              ),
              "string.empty": ResponseConstant.validation.isEmpty("Password"),
              "any.required":
                ResponseConstant.validation.isRequired("Password"),
            }),
        }).messages({
          "object.unknown": ResponseConstant.validation.extraDataProvided,
          "object.base": ResponseConstant.validation.invalidData,
        }),
      }).unknown(true);

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

  async signup(request, response, next) {
    try {
      const validationResult = await this.validateRequest(request);
      if (!validationResult.isValid) {
        const error = new Error(validationResult.errors);
        error.statusCode = 400;
        throw error;
      }

      const data = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        role: "user",
      };

      const user = new DatabaseService(User);
      const existingUser = await user.findAll({ email: data.email });

      if (existingUser.length > 0) {
        logger.log(`${data.email} already exists`);
        const error = new Error(ResponseConstant.user.userAlreadyExists);
        error.statusCode = 409;
        throw error;
      }

      const createdUser = await user.create(data);
      if (!createdUser) {
        logger.log(`${data.email} sign up failed`);
        const error = new Error(ResponseConstant.authentication.signUpFailed);
        throw error;
      }

      createdUser.password = undefined;

      appEvent.emit("user.signup", createdUser);

      logger.log(`${createdUser.email} signed up successfully`);

      const responseData = new SuccessResponseMiddleware();
      return responseData.send(request, response, createdUser);
    } catch (error) {
      error.message =
        error.message || ResponseConstant.authentication.signUpFailed;
      return next(error);
    }
  }
}

export { SignupController };
