import { prismaClient } from "../application/database.js";

const getDashboard = async () => {
    const countKunjunganPerWeek = await prismaClient.$queryRaw`
        SELECT COUNT(*) AS jumlah_kunjungan, 
        WEEK(created_at) AS week, 
        YEAR(created_at) AS year
        FROM riwayat_kunjungans
        where YEAR(created_at) = YEAR(CURDATE()) 
        AND WEEK(created_at) = WEEK(CURDATE()) 
        GROUP BY week, year`;

    const countKunjunganPerMonth = await prismaClient.$queryRaw`
        SELECT COUNT(*) AS jumlah_kunjungan,
        MONTH(created_at) AS month,
        YEAR(created_at) AS year
        FROM riwayat_kunjungans
        where YEAR(created_at) = YEAR(CURDATE())
        AND MONTH(created_at) = MONTH(CURDATE())
        GROUP BY month, year`


    return {

        KunjunganPerWeek: Number(countKunjunganPerWeek[0].jumlah_kunjungan),
        KunjunganPerMonth: Number(countKunjunganPerMonth[0].jumlah_kunjungan),

    }
}


export default { getDashboard }