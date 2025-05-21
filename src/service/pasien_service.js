import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prismaClient } from "../application/database.js"
import { inputPasienValidation } from "../validation/pasien_validation.js"
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response_erorr.js";

const getPasien = async (searchQuery) => {
    if (!searchQuery) {
        return await prismaClient.pasien.findMany({
            where: {
                is_deleted: false
            },
        });
    }

    const pasien = await prismaClient.pasien.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { nama: { contains: searchQuery, mode: 'insensitive' } },
                        { nik: { contains: searchQuery, mode: 'insensitive' } },
                    ],
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
            throw new ResponseError(404, "Id pasien tidak ditemukan");

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

        if (checkIsDeleted.is_deleted === true) {
            throw new ResponseError(404, "Id pasien tidak ditemukan");
        }

        const pasien = await prismaClient.pasien.update({
            where: {
                id_pasien: id
            },
            data: {
                is_deleted: true
            }
        })

        if (pasien.is_deleted === true) {
            throw new ResponseError(404, "Id pasien tidak ditemukan");
        }

        return pasien
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new ResponseError(404, "Id pasien tidak ditemukan");
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

    if (checkIsDeleted.is_deleted === true) {
        throw new ResponseError(404, "Id pasien tidak ditemukan");
    }

    const pasien = await prismaClient.riwayatKunjungan.findMany({
        where: {
            id_pasien: id
        }
    });



    return pasien
}

export default {
    createPasien,
    getPasien,
    updatePasien,
    deletePasien,
    getRiwayatPasien,
}
