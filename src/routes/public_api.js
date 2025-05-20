import { Router } from "express";
import userController from "../controller/auth_controller.js";

export const publicRouter = Router();

publicRouter.post("/login", userController.login)