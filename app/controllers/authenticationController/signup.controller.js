class SignupController {
  constructor() {}

  async validateData(request) {}

  async signup(request, response, next) {
    try {
      return response.json({ message: "Signup successful." });
    } catch (error) {
      error.message =
        error.message ||
        "Some error occured for signup route. Please try again later.";
      return next(error);
    }
  }
}

export { SignupController };
