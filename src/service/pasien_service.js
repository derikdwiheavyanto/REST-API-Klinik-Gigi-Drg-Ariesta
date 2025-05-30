import { prismaClient } from "../application/database.js"
import { inputPasienValidation } from "../validation/pasien_validation.js"
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response_erorr.js";
import { inputRiwayatValidation } from "../validation/riwayat_validation.js";
import { generateNoPasien } from "../utils/helper/generate_no_pasien.js";
import { checkDeletedPasien } from "../utils/helper/check_deleted_pasien.js";

// get data pasien by pagination desc
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
                        { no_pasien: { contains: searchQuery, } },
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

    const select = {
        id_pasien: true,
        no_pasien: true,
        nama: true,
        alamat: true,
        no_hp: true,
        umur: true,
        created_at: true,
        updated_at: true,
    }

    // Ambil data sesuai pagination
    const pasien = await prismaClient.pasien.findMany({
        where: whereClause,
        select: select,
        skip: skip,
        take: limit,
        orderBy: {
            created_at: 'desc'
        }
    });

    // Hitung total halaman
    const totalPage = Math.ceil(totalData / limit);

    return {
        data: pasien,
        totalData,
        totalPage
    };
};

// get data pasien by id
const getPasienById = async (id) => {
    const checkIsDeleted = await checkDeletedPasien(id)

    if (checkIsDeleted) {
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

// create data pasien
const createPasien = async (request) => {
    const inputPasien = validate(inputPasienValidation, request)

    let pasien;
    const noPasien = await generateNoPasien();

    pasien = await prismaClient.pasien.create({
        data: {
            no_pasien: noPasien,
            nama: inputPasien.nama,
            alamat: inputPasien.alamat,
            no_hp: inputPasien.no_hp,
            umur: inputPasien.umur
        },
    });

    return pasien;
};

// update data pasien by id
const updatePasien = async (id, request) => {
    const inputPasien = validate(inputPasienValidation, request)

    const checkIsDeleted = await checkDeletedPasien(id)

    if (checkIsDeleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }

    const pasien = await prismaClient.pasien.update({
        where: {
            id_pasien: id
        },
        data: {
            nama: inputPasien.nama,
            alamat: inputPasien.alamat,
            no_hp: inputPasien.no_hp,
            umur: inputPasien.umur
        },
    });

    return pasien;




};


// soft delete data pasien
const deletePasien = async (id) => {
    const checkIsDeleted = await checkDeletedPasien(id)

    if (checkIsDeleted) {
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
}

// get data riwayat pasien by id pasien
const getRiwayatPasien = async (id) => {

    const checkIsDeleted = await checkDeletedPasien(id)

    if (checkIsDeleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }

    const pasien = await prismaClient.riwayatKunjungan.findMany({
        where: {
            id_pasien: id
        },
        orderBy: [
            { tanggal_kunjungan: 'asc' },
            { created_at: 'desc' }
        ]
    });

    return pasien
}

// get data riwayat pasien by id
const getRiwayatById = async (id, id_kunjungan) => {

    const checkIsDeleted = await checkDeletedPasien(id)

    if (checkIsDeleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }

    const riwayat = await prismaClient.riwayatKunjungan.findUnique({
        where: {
            id_kunjungan: id_kunjungan
        }
    });

    return riwayat
}

// create data riwayat
const createRiwayat = async (id_pasien, { anamnesa, diagnosa, terapi, catatan, image, tanggal_kunjungan }) => {
    const checkIsDeleted = await checkDeletedPasien(id_pasien)

    if (checkIsDeleted) {
        throw new ResponseError(404, "Pasien tidak ditemukan atau telah dihapus");
    }

    const riwayat = await prismaClient.riwayatKunjungan.create({
        data: {
            id_pasien: id_pasien,
            anamnesa: anamnesa,
            diagnosa: diagnosa,
            terapi: terapi,
            catatan: catatan,
            tanggal_kunjungan: tanggal_kunjungan,
            image: image,
        },
    });

    return riwayat;
};

// update data riwayat
const updateRiwayatPasien = async ({ id_pasien, id_kunjungan, imagePath }, request) => {
    const inputRiwayat = validate(inputRiwayatValidation, request)
    const checkIsDeleted = await checkDeletedPasien(id_pasien)

    if (checkIsDeleted) {
        throw new ResponseError(404, "data pasien tidak ditemukan");
    }

    const data = {
        anamnesa: inputRiwayat.anamnesa,
        diagnosa: inputRiwayat.diagnosa,
        terapi: inputRiwayat.terapi,
        catatan: inputRiwayat.catatan,
        tanggal_kunjungan: inputRiwayat.tanggal_kunjungan
    }

    if (imagePath) {
        data.image = imagePath
    }

    const riwayatKunjungan = await prismaClient.riwayatKunjungan.update({
        where: {
            id_kunjungan: id_kunjungan,
            id_pasien: id_pasien
        },
        data: data
    })

    return riwayatKunjungan
}

// delete data riwayat
const deleteRiwayatPasien = async (id_pasien, id_kunjungan) => {
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

}


export default {
    createPasien,
    getPasien,
    getPasienById,
    updatePasien,
    deletePasien,
    createRiwayat,
    getRiwayatPasien,
    getRiwayatById,
    updateRiwayatPasien,
    deleteRiwayatPasien,
}
