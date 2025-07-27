import { API_RESPONSE } from "../../constants/index.js";
import { logger } from "../../services/index.js";
import Joi from "joi";

async function validateData(request) {
  let validationResult = { isValid: true, errors: "" };
  try {
    const schema = Joi.object({
      body: Joi.object({
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

async function signin(request, response, next) {
  try {
    const validationResult = await validateData(request);
    if (!validationResult.isValid) {
      const error = new Error(validationResult.errors);
      error.status = 400;
      throw error;
    }

    return response.status(200).json({
      message: API_RESPONSE.AUTHENTICATION.SIGN_IN_SUCCESS,
      data: null,
      status: 200,
    });
  } catch (error) {
    logger.error("Error in signin controller:", error);
    next(error);
  }
}

export { signin };
