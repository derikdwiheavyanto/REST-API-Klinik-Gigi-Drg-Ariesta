import Joi from "joi";


const loginPasienValidation = Joi.object({
    nik: Joi.string().max(16).required(),
    nama: Joi.string().max(100).required(),
    alamat: Joi.string().max(100).required(),
    no_hp: Joi.string().max(20).required()
})

const inputPasienValidation = Joi.object({
    nik: Joi.string().max(16).required(),
    nama: Joi.string().max(100).required(),
    alamat: Joi.string().max(100).optional(),
    no_hp: Joi.string().max(20).optional()
})

export { loginPasienValidation, inputPasienValidation };