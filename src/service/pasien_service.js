import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prismaClient } from "../application/database.js"
import { inputPasienValidation } from "../validation/pasien_validation.js"
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response_erorr.js";
import { inputRiwayatValidation } from "../validation/riwayat_validation.js";

const getPasien = async (searchQuery, skip, limit) => {
    let whereClause = {
        is_deleted: false
    };

    if (searchQuery) {
        whereClause = {
            AND: [
                {
                    OR: [
                        { nama: { contains: searchQuery, } },
                        { nik: { contains: searchQuery, } },
                    ],
                },
                {
                    is_deleted: false
                }
            ]
        };
    }

    // Hitung total data yang cocok
    const totalData = await prismaClient.pasien.count({
        where: whereClause
    });

    // Ambil data sesuai pagination
    const pasien = await prismaClient.pasien.findMany({
        where: whereClause,
        skip: skip,
        take: limit
    });

    // Hitung total halaman
    const totalPage = Math.ceil(totalData / limit);

    return {
        data: pasien,
        totalData,
        totalPage
    };
};
const getPasienById = async (id) => {
    const checkIsDeleted = await prismaClient.pasien.findUnique({
        where: {
            id_pasien: id
        }
    });

    if (!checkIsDeleted || checkIsDeleted.is_deleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }


    const pasien = await prismaClient.pasien.findFirst({
        where: {
            AND: [
                {
                    id_pasien: id
                },
                {
                    is_deleted: false
                }
            ]
        },
    });

    return pasien
}

const createPasien = async (request) => {
    const inputPasien = validate(inputPasienValidation, request)
    const pasien = await prismaClient.pasien.create({
        data: {
            nama: inputPasien.nama,
            nik: inputPasien.nik,
            alamat: inputPasien.alamat,
            no_hp: inputPasien.no_hp
        },
    });

    return pasien;
};
const updatePasien = async (id, request) => {
    try {
        const inputPasien = validate(inputPasienValidation, request)

        const checkIsDeleted = await prismaClient.pasien.findUnique({
            where: {
                id_pasien: id
            }
        });

        if (!checkIsDeleted || checkIsDeleted.is_deleted) {
            throw new ResponseError(404, "data pasien tidak ditemukan");
        }

        const pasien = await prismaClient.pasien.update({
            where: {
                id_pasien: id
            },
            data: {
                nama: inputPasien.nama,
                nik: inputPasien.nik,
                alamat: inputPasien.alamat,
                no_hp: inputPasien.no_hp
            },
        });

        return pasien;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new ResponseError(404, "data pasien tidak ditemukan");

        }

        throw error
    }


};

const deletePasien = async (id) => {
    try {

        const checkIsDeleted = await prismaClient.pasien.findUnique({
            where: {
                id_pasien: id
            }
        });

        if (!checkIsDeleted || checkIsDeleted.is_deleted) {
            throw new ResponseError(404, "data pasien tidak ditemukan");
        }

        const pasien = await prismaClient.pasien.update({
            where: {
                id_pasien: id
            },
            data: {
                is_deleted: true
            }
        })

        return pasien
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new ResponseError(404, "data pasien tidak ditemukan");
        }

        throw error
    }
}

const getRiwayatPasien = async (id) => {

    const checkIsDeleted = await prismaClient.pasien.findUnique({
        where: {
            id_pasien: id
        }
    });

    if (!checkIsDeleted || checkIsDeleted.is_deleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }

    const pasien = await prismaClient.riwayatKunjungan.findMany({
        where: {
            id_pasien: id
        }
    });

    return pasien
}

const createRiwayat = async (id_pasien, { anamnesa, diagnosa, terapi, catatan, image }) => {
    const pasien = await prismaClient.pasien.findUnique({
        where: {
            id_pasien
        },
    });

    if (!pasien || pasien.is_deleted) {
        throw new Error("Pasien tidak ditemukan atau telah dihapus");
    }

    const riwayat = await prismaClient.riwayatKunjungan.create({
        data: {
            id_pasien: id_pasien,
            anamnesa: anamnesa,
            diagnosa: diagnosa,
            terapi: terapi,
            catatan: catatan,
            image: image,
        },
    });

    return riwayat;
};

const updateRiwayatPasien = async ({ id_pasien, id_kunjungan, imagePath }, request) => {
    const inputRiwayat = validate(inputRiwayatValidation, request)
    const checkIsDeleted = await prismaClient.pasien.findUnique({
        where: {
            id_pasien: id_pasien

        }
    })

    if (!checkIsDeleted || checkIsDeleted.is_deleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }

    const riwayatKunjungan = await prismaClient.riwayatKunjungan.update({
        where: {
            id_kunjungan: id_kunjungan,
            id_pasien: id_pasien
        },
        data: {
            anamnesa: inputRiwayat.anamnesa,
            diagnosa: inputRiwayat.diagnosa,
            terapi: inputRiwayat.terapi,
            catatan: inputRiwayat.catatan,
            image: imagePath
        }
    })

    return riwayatKunjungan
}

const deleteRiwayatPasien = async (id_pasien, id_kunjungan) => {
    try {

        const checkIsDeleted = await prismaClient.riwayatKunjungan.count({
            where: {
                AND: [
                    {
                        id_kunjungan: id_kunjungan
                    },
                    {
                        id_pasien: id_pasien
                    }
                ]

            }
        });

        if (checkIsDeleted === 0) {
            throw new ResponseError(404, "Riwayat tidak ditemukan");
        }

        const riwayatKunjungan = await prismaClient.riwayatKunjungan.delete({
            where: {
                id_kunjungan: id_kunjungan,
                id_pasien: id_pasien
            },
        })

        return riwayatKunjungan
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new ResponseError(404, "data pasien tidak ditemukan");
        }

        throw error
    }
}


export default {
    createPasien,
    getPasien,
    getPasienById,
    updatePasien,
    deletePasien,
    createRiwayat,
    getRiwayatPasien,
    updateRiwayatPasien,
    deleteRiwayatPasien,
}
