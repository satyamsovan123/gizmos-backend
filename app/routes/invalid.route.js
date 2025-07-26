import express from "express";

class InvalidRoute {
  constructor() {
    this.invalidRouter = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.invalidRouter.route("*").get(invalidRouteController);
  }
}

export { InvalidRoute };
