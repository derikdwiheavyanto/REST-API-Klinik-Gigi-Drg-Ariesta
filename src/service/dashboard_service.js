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

    const awalTahun = new Date(new Date().getFullYear(), 0, 1);
    const akhirTahun = new Date(new Date().getFullYear() + 1, 0, 1);

    const topPasien = await prismaClient.pasien.findMany({
        where: {
            is_deleted: false,
            created_at: {
                gte: awalTahun,
                lt: akhirTahun
            }
        },
        include: {
            _count: {
                select: {
                    riwayat_kunjungan: true,
                },
            },
        },
        orderBy: {
            riwayat_kunjungan: {
                _count: 'desc'
            },
        },

        take: 5,
    });

    topPasien.forEach(pasien => {
        pasien.riwayat_kunjungan = Number(pasien._count.riwayat_kunjungan);
        delete pasien._count;
    });

    return {

        KunjunganPerWeek: Number(countKunjunganPerWeek[0].jumlah_kunjungan),
        KunjunganPerMonth: Number(countKunjunganPerMonth[0].jumlah_kunjungan),
        topPasien: topPasien

    }
}


export default { getDashboard }