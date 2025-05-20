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

export default {
    getPasien
}
