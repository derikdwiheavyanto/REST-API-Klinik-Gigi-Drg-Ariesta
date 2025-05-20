import pasien_service from "../service/pasien_service.js"


const getPasienSearch = async (req, res, next) => {
    try {
        const searchQuery = req.query.search || ''
        const result = await pasien_service.getPasien(searchQuery)

        res.status(200).json({ data: result })
    } catch (error) {
        next(error)
    }
}

export default {
    getPasienSearch
}