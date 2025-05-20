import { Router } from "express";
import { authMiddleware } from "../middleware/auth_middleware.js";
import auth_controller from "../controller/auth_controller.js";
import pasien_controller from "../controller/pasien_controller.js";

export const privateRouter = Router();

privateRouter.use(authMiddleware)

// pasien
privateRouter.post("/pasien", pasien_controller.createPasien);
privateRouter.get("/pasien", pasien_controller.getPasienSearch);
privateRouter.patch("/pasien/:id", pasien_controller.updatePasien);

// kunjungan pasien
privateRouter.get("/pasien/:id/kunjungan", pasien_controller.getRiwayatPasien)
privateRouter.delete("/logout", auth_controller.logout)