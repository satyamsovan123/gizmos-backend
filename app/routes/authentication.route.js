import { signin, signup } from "../controllers/index.js";

import express from "express";

const authenticationRouter = express.Router();

authenticationRouter.post("/signin", signin);
authenticationRouter.post("/signup", signup);

export { authenticationRouter };
