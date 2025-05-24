
import { ResponseError } from "../error/response_erorr.js";
import pasien_service from "../service/pasien_service.js"


const getPasienSearch = async (req, res, next) => {
    try {
        const searchQuery = req.query.search || ''
        const page = parseInt(req.query.page) || 1;       // halaman ke-berapa
        const limit = parseInt(req.query.limit) || 10;    // berapa data per halaman
        const skip = (page - 1) * limit;

        const result = await pasien_service.getPasien(searchQuery, skip, limit)

        res.status(200).json({
            message: "Get Data Pasien Success",
            data: result.data,
            total_data: result.totalData,
            total_page: result.totalPage
        })
    } catch (error) {
        next(error)
    }
}
const getPasienById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pasien_service.getPasienById(id)

        res.status(200).json({
            message: "Get Data Pasien Success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const createPasien = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await pasien_service.createPasien(request);

        res.status(201).json({
            message: "Data pasien berhasil disimpan",
            data: result,
        });
    } catch (error) {
        if (error.code === "P2002" && error.meta.target.includes("nik")) {
            throw new ResponseError(400, "NIK sudah terdaftar");
        }
        next(error);
    }
};

const updatePasien = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const request = req.body;
        const result = await pasien_service.updatePasien(id, request);

        res.status(200).json({
            message: "Data pasien berhasil diupdate",
            data: result,
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new ResponseError(404, "data pasien tidak ditemukan");

        }
        next(error);
    }
};

const deletePasien = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await pasien_service.deletePasien(id)

        res.status(200).json({
            message: "Data pasien berhasil dihapus",
        })
    } catch (error) {
        if (error.code === 'P2025') {
            throw new ResponseError(404, "data pasien tidak ditemukan");

        }
        next(error)
    }
}

const getRiwayatPasien = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pasien_service.getRiwayatPasien(id)
        const baseUrl = process.env.BASE_URL
        result.forEach(riwayat => {
            riwayat.image = `${baseUrl}/${riwayat.image}`
        });
        res.status(200).json({
            message: "Get Data Riwayat Success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getRiwayatById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const id_kunjungan = parseInt(req.params.id_kunjungan)
        const result = await pasien_service.getRiwayatById(id, id_kunjungan)
        const baseUrl = process.env.BASE_URL
        result.image = `${baseUrl}/${result.image}`
        res.status(200).json({
            message: "Get Data Riwayat Success",
            data: result
        })
    } catch (error) {
        if (error.code === 'P2025') {
            throw new ResponseError(404, "data riwayat tidak ditemukan");
        }
        next(error)
    }
}

const createRiwayat = async (req, res, next) => {
    try {
        const id_pasien = parseInt(req.params.id, 10);
        const { anamnesa, diagnosa, terapi, catatan, } = req.body;
        const imagePath = req.file ? req.file.path : null;

        // Validasi input
        if (!anamnesa || !diagnosa || !terapi) {
            return res.status(400).json({
                message: "Anamnesa, diagnosa, dan terapi harus diisi!",
            });
        }

        const result = await pasien_service.createRiwayat(id_pasien, {
            anamnesa,
            diagnosa,
            terapi,
            catatan,
            image: imagePath,
        });

        res.status(201).json({
            message: "Riwayat kunjungan berhasil ditambahkan",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateRiwayatPasien = async (req, res, next) => {
    try {
        const id_pasien = parseInt(req.params.id)
        const id_kunjungan = parseInt(req.params.id_kunjungan)
        const request = req.body
        const imagePath = req.file ? req.file.path : null

        const result = await pasien_service.updateRiwayatPasien({
            id_pasien,
            id_kunjungan,
            imagePath
        }, request)

        res.status(200).json({
            message: "Riwayat kunjungan berhasil diupdate",
            data: result
        })
    } catch (error) {
        if (error.code === 'P2025') {
            throw new ResponseError(404, "data riwayat tidak ditemukan");

        }
        next(error)
    }
}

const deleteRiwayatPasien = async (req, res, next) => {
    try {
        const id_pasien = parseInt(req.params.id)
        const id_kunjungan = parseInt(req.params.id_kunjungan)
        await pasien_service.deleteRiwayatPasien(id_pasien, id_kunjungan)

        res.status(200).json({
            message: "Data kunjungan berhasil dihapus",
        })
    } catch (error) {
        if (error.code === 'P2025') {
            throw new ResponseError(404, "data pasien tidak ditemukan");

        }
        next(error)
    }
}

export default {
    getPasienSearch,
    getPasienById,
    createPasien,
    updatePasien,
    deletePasien,
    getRiwayatPasien,
    getRiwayatById,
    createRiwayat,
    updateRiwayatPasien,
    deleteRiwayatPasien,
}