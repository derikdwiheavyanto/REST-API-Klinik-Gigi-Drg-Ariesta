import { prismaClient } from "./application/database.js";
import { logger } from "./application/logging.js";
import { web } from "./application/web.js";
import dotenv from "dotenv";



dotenv.config()
const port = process.env.PORT || 8001;
web.listen(port, async () => {
    logger.info("Server running on port " + port);
    try {
        await prismaClient.$connect()
        logger.info("✅ Koneksi ke database berhasil!")
    } catch (error) {
        logger.error("❌ Koneksi ke database Gagal!")
    } finally {
        await prismaClient.$disconnect();
    }
});
