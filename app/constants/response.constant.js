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

  static authentication = {
    invalidCredentials: "Please provide valid credentials.",
    signInSuccess: "Sign in successful.",
    signUpSuccess: "Sign up successful.",
  };
}

export { ResponseConstant };
