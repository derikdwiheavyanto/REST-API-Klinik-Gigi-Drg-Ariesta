import { prismaClient } from "../application/database.js";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
dayjs.extend(isoWeek);

const getDashboard = async () => {
    const startOfWeek = dayjs().startOf('isoWeek').toDate(); // Senin
    const endOfWeek = dayjs().endOf('isoWeek').toDate();

    const countKunjunganPerWeek = await prismaClient.riwayatKunjungan.count({
        where: {
            created_at: {
                gte: startOfWeek,
                lte: endOfWeek,
            },
        },
    });

    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    const countKunjunganPerMonth = await prismaClient.riwayatKunjungan.count({
        where: {
            created_at: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        },
    });


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

        KunjunganPerWeek: countKunjunganPerWeek,
        KunjunganPerMonth: countKunjunganPerMonth,
        topPasien: topPasien

    }
}


export default { getDashboard }