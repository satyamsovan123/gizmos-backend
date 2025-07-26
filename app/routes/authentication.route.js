import express from "express";
import { SignupController, SigninController } from "../controllers/index.js";

class AuthenticationRoute {
  constructor() {
    this.authenticationRouter = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const signupController = new SignupController();
    const signinController = new SigninController();

    this.authenticationRouter.route("/signup").post(signupController.signup);
    this.authenticationRouter.route("/signin").post(signinController.signin);
  }
}

export { AuthenticationRoute };
