import { prismaClient } from "./application/database.js";
import { web } from "./application/web.js";
import dotenv from "dotenv";



dotenv.config()
const port = process.env.PORT || 8000;
web.listen(port, async () => {
    console.log("Server running on port " + port);
    try {
        await prismaClient.$connect()
        console.log("✅ Koneksi ke database berhasil!")
    } catch (error) {
        console.log("❌ Koneksi ke database Gagal!")
    } finally {
        await prismaClient.$disconnect();
    }
});
