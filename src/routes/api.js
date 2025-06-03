import { Router } from "express";
import { authMiddleware } from "../middleware/auth_middleware.js";
import auth_controller from "../controller/auth_controller.js";
import pasien_controller from "../controller/pasien_controller.js";
import dashboard_controller from "../controller/dashboard_controller.js";
import upload from "../middleware/file_upload.js";

export const privateRouter = Router();

// privateRouter.use(authMiddleware)


// dashboard
privateRouter.get("/dashboard", authMiddleware, dashboard_controller.getDashboard);

// pasien
privateRouter.post("/pasien", authMiddleware, pasien_controller.createPasien);
privateRouter.get("/pasien", authMiddleware, pasien_controller.getPasienSearch);
privateRouter.get("/pasien/:id", authMiddleware, pasien_controller.getPasienById);
privateRouter.patch("/pasien/:id", authMiddleware, pasien_controller.updatePasien);
privateRouter.delete("/pasien/:id", authMiddleware, pasien_controller.deletePasien);

// kunjungan pasien
privateRouter.get("/pasien/:id/kunjungan", authMiddleware, pasien_controller.getRiwayatPasien);
privateRouter.get("/pasien/:id/kunjungan/:id_kunjungan", authMiddleware, pasien_controller.getRiwayatById);
privateRouter.post("/pasien/:id/kunjungan", authMiddleware, upload.single("image"), pasien_controller.createRiwayat);
privateRouter.patch("/pasien/:id/kunjungan/:id_kunjungan", authMiddleware, upload.single("image"), pasien_controller.updateRiwayatPasien);
privateRouter.delete("/pasien/:id/kunjungan/:id_kunjungan", authMiddleware, pasien_controller.deleteRiwayatPasien)
privateRouter.post("/logout", authMiddleware, auth_controller.logout)
// privateRouter.delete("/logout", auth_controller.logout)

// export data pasien
privateRouter.get("/export", authMiddleware, pasien_controller.exportPasien)
