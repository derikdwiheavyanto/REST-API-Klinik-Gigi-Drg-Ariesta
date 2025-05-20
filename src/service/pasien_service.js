import { prismaClient } from "../application/database.js"

const getPasien = async (searchQuery) => {
    if (!searchQuery) {
        return await prismaClient.pasien.findMany();
    }

    const pasien = await prismaClient.pasien.findMany({
        where: {
            OR: [
                { nama: { contains: searchQuery } },
                { nik: { contains: searchQuery } },
            ],
        },
    });

    return pasien
}

const createPasien = async ({ nama, nik, alamat, no_hp }) => {
    const pasien = await prismaClient.pasien.create({
        data: {
            nama: nama,
            nik: nik,
            alamat: alamat,
            no_hp: no_hp
        },
    });

    return pasien;
};

export default {
    createPasien,
    getPasien
}
