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
    return pasien;
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

const deletePasien = async (id) => {
    const deletedPasien = await prismaClient.pasien.delete({
        where: { id_pasien: Number(id) },
    });

    return deletedPasien;
};

export default {
    createPasien,
    getPasien,
    deletePasien
}
