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

const createPasien = async (req, res, next) => {
    try {
        const { nama, nik, alamat, no_hp } = req.body;

        // Validasi input
        if (!nama || !nik || !alamat || !no_hp) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        const result = await pasien_service.createPasien({
            nama,
            nik,
            alamat,
            no_hp,
        });

        res.status(201).json({
            message: "Data pasien berhasil disimpan",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deletePasien = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID pasien harus disertakan!" });
        }

        const result = await pasien_service.deletePasien(id);

        if (result) {
            res.status(200).json({ message: "Data pasien berhasil dihapus" });
        } else {
            res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
    } catch (error) {
        next(error);
    }
};

export default {
    getPasienSearch,
    createPasien,
    deletePasien
}