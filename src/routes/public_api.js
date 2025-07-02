import { Router } from "express";
import userController from "../controller/auth_controller.js";
import auth_controller from "../controller/auth_controller.js";

export const publicRouter = Router();

publicRouter.post("/login", userController.login)
publicRouter.post("/refresh-token", auth_controller.refreshToken)
