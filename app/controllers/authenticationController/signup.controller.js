import { API_RESPONSE } from "../../constants/index.js";
import { logger } from "../../services/index.js";
import { appEventEmitter } from "../../events/index.js";
import Joi from "joi";
import { User } from "../../models/index.js";

async function validateData(request) {
  let validationResult = { isValid: true, errors: "" };
  try {
    const schema = Joi.object({
      body: Joi.object({
        name: Joi.string()
          .min(1)
          .required()
          .messages({
            "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Name"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Name"
            ),
          }),
        email: Joi.string()
          .email()
          .min(1)
          .required()
          .messages({
            "string.email": API_RESPONSE.FIELD_IS_INVALID.replace(
              "Field",
              "Email"
            ),
            "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Email"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Email"
            ),
          }),
        password: Joi.string()
          .min(6)
          .required()
          .messages({
            "string.min": API_RESPONSE.FIELD_IS_INVALID.replace(
              "Field",
              "Password"
            ),
            "string.empty": API_RESPONSE.FIELD_IS_EMPTY.replace(
              "Field",
              "Password"
            ),
            "any.required": API_RESPONSE.FIELD_IS_REQUIRED.replace(
              "Field",
              "Password"
            ),
          }),
      }).messages({
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

async function signup(request, response, next) {
  try {
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      return response.status(400).json({
        status: 400,
        message: validationResult.errors,
      });
    }

    appEventEmitter.emit("user.signup.success", {
      email: request.body.email,
    });

    return response.status(200).json({
      message: API_RESPONSE.AUTHENTICATION.SIGN_UP_SUCCESS,
      data: null,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in signup controller:", error);
    next(error);
  }
}

export { signup };
