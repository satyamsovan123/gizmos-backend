import express from "express";

import { authenticationRouter } from "./authentication.route.js";
import { API_RESPONSE, SERVER_ERROR_RESPONSE } from "../constants/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: API_RESPONSE.API_OPERATIONAL });
});

router.use(authenticationRouter);

router.use(/(.*)/, (req, res) => {
  res.status(404).json({ message: SERVER_ERROR_RESPONSE.NOT_FOUND });
});

export { router };
