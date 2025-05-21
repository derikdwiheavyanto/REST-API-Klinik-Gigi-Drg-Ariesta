import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"
import { ResponseError } from "../error/response_erorr.js"
import pasien_service from "../service/pasien_service.js"


const getPasienSearch = async (req, res, next) => {
    try {
        const searchQuery = req.query.search || ''
        const result = await pasien_service.getPasien(searchQuery)

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
        next(error)
    }
}


const getRiwayatPasien = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pasien_service.getRiwayatPasien(id)

        res.status(200).json({
            message: "Get Data Riwayat Success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    getPasienSearch,
    createPasien,
    updatePasien,
    deletePasien,
    getRiwayatPasien,
}