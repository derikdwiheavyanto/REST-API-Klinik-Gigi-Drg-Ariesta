import { Router } from "express";
import { authMiddleware } from "../middleware/auth_middleware.js";
import auth_controller from "../controller/auth_controller.js";
import pasien_controller from "../controller/pasien_controller.js";
import dashboard_controller from "../controller/dashboard_controller.js";
import upload from "../middleware/file_upload.js";

export const privateRouter = Router();

privateRouter.use(authMiddleware)


// dashboard
privateRouter.get("/dashboard", dashboard_controller.getDashboard);

// pasien
privateRouter.post("/pasien", pasien_controller.createPasien);
privateRouter.get("/pasien", pasien_controller.getPasienSearch);
privateRouter.get("/pasien/:id", pasien_controller.getPasienById);
privateRouter.patch("/pasien/:id", pasien_controller.updatePasien);
privateRouter.delete("/pasien/:id", pasien_controller.deletePasien);

// kunjungan pasien
privateRouter.get("/pasien/:id/kunjungan", pasien_controller.getRiwayatPasien);
privateRouter.post("/pasien/:id/kunjungan", upload.single("image"), pasien_controller.createRiwayat);
privateRouter.patch("/pasien/:id/kunjungan/:id_kunjungan", upload.single("image"), pasien_controller.updateRiwayatPasien);
privateRouter.delete("/pasien/:id/kunjungan/:id_kunjungan", pasien_controller.deleteRiwayatPasien)
privateRouter.delete("/logout", auth_controller.logout)