class ResponseConstant {
  constructor() {}

  static api = {
    version: "/api/v1",
    backendRunning: "Backend is running.",
    tooManyRequests: "Too many requests.",
    invalidApiPath: "Invalid API path or method.",
    genericError: "Something went wrong.",
    genericSuccess: "Successful.",
  };

  static validation = {
    invalidData: "Invalid data provided.",
    missingRequiredFields: "Missing required fields.",
    extraDataProvided: "Please do not provide any extra data.",

    isInvalid: (field) => `${field} is invalid.`,
    isRequired: (field) => `${field} is required.`,
    isEmpty: (field) => `${field} is empty.`,
    minLength: (field, limit) =>
      `${field} should have at least ${limit} characters.`,
    maxLength: (field, limit) =>
      `${field} should have at most ${limit} characters.`,
  };

  static authentication = {
    invalidCredentials: "Please provide valid credentials.",
    signInSuccess: "Sign in successful.",
    signUpSuccess: "Sign up successful.",
    signOutSuccess: "Sign out successful.",
    signInFailed: "Sign in failed.",
    signUpFailed: "Sign up failed.",
    signOutFailed: "Sign out failed.",
  };

  static user = {
    userNotFound: "User not found.",
    userAlreadyExists: "User already exists.",
    userCreated: "User created successfully.",
    userUpdated: "User updated successfully.",
  };
}

export { ResponseConstant };
