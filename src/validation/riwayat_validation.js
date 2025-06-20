import Joi from "joi";



const inputRiwayatValidation = Joi.object({
    anamnesa: Joi.string().required().messages({
        "string.empty": "Anamnesa harus diisi",
        "any.required": "Anamnesa harus diisi",
    }),
    diagnosa: Joi.string().required().messages({
        "string .empty": "Diagnosa harus diisi",
        "any.required": "Diagnosa harus diisi",
    }),
    terapi: Joi.string().required().messages({
        "string.empty": "Terapi harus diisi",
        "any.required": "Terapi harus diisi",
    }),
    catatan: Joi.string().allow('').optional(),
    tanggal_kunjungan: Joi.date().required().messages({
        "string.empty": "Tanggal kunjungan harus diisi",
        "any.required": "Tanggal kunjungan harus diisi",
    }),
})

export { inputRiwayatValidation };