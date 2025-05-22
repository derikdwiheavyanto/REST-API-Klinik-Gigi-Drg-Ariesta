import Joi from "joi";

const loginUserValidation = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
}).messages({
    "string.empty": "{#label} wajib diisi",
    "any.required": "{#label} wajib diisi",
});

export {
    loginUserValidation
}