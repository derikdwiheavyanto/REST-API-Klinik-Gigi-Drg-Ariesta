import { Router } from "express";
import { authMiddleware } from "../middleware/auth_middleware.js";
import auth_controller from "../controller/auth_controller.js";
import pasien_controller from "../controller/pasien_controller.js";

export const privateRouter = Router();

privateRouter.use(authMiddleware)

privateRouter.get("/pasien", pasien_controller.getPasienSearch)
privateRouter.delete("/logout", auth_controller.logout)