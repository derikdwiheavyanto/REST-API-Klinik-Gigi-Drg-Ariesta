import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response_erorr.js"
import { loginUserValidation } from "../validation/login_validation.js"
import { validate } from "../validation/validation.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request)

    const user = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    })


    if (!user) {
        throw new ResponseError(401, "username or password wrong");
    }

    const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password)

    if (!isPasswordMatch) {
        throw new ResponseError(401, "username or password wrong");
    }

    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY_JWT, { expiresIn: '1h' })

    return {
        username: user.username,
        token: token
    }

}

const logout = async () => {
    return {
        message: "logout success"
    }
}

export default {
    login,
    logout
}