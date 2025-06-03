import Joi from "joi";



const inputPasienValidation = Joi.object({
    nama: Joi.string().max(100).required().messages({
        "string.empty": "Nama harus diisi",
        "any.required": "Nama harus diisi",
        "string.max": "Nama tidak boleh lebih dari 100 karakter",
    }),
    alamat: Joi.string().max(100).allow('').optional().messages({
        "string.max": "Alamat tidak boleh lebih dari 100 karakter",
    }),
    no_hp: Joi.string().max(20).allow('').optional().messages({
        "string.max": "No HP tidak boleh lebih dari 20 karakter",
    }),
    umur: Joi.number().optional().messages({
        "number.base": "Umur harus berupa angka",
    }),
});


export { inputPasienValidation };