import Joi from "joi";



const inputPasienValidation = Joi.object({
    nik: Joi.string().max(16).required().messages({
        "string.empty": "NIK harus diisi",
        "any.required": "NIK harus diisi",
        "string.max": "NIK tidak boleh lebih dari 16 karakter",
    }),
    nama: Joi.string().max(100).required().messages({
        "string.empty": "Nama harus diisi",
        "any.required": "Nama harus diisi",
        "string.max": "Nama tidak boleh lebih dari 100 karakter",
    }),
    alamat: Joi.string().max(100).optional().messages({
        "string.max": "Alamat tidak boleh lebih dari 100 karakter",
    }),
    no_hp: Joi.string().max(20).optional().messages({
        "string.max": "No HP tidak boleh lebih dari 20 karakter",
    }),
});


export { inputPasienValidation };