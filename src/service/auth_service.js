import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response_erorr.js";
import { loginUserValidation } from "../validation/login_validation.js";
import { validate } from "../validation/validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import { redisClient } from "../application/database.js";


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findFirst({
        where: { username: loginRequest.username },
        select: { username: true, password: true }
    });

    if (!user) throw new ResponseError(401, "username or password wrong");

    const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordMatch) throw new ResponseError(401, "username or password wrong");


    return { username: user.username };
};

const generateAccessToken = (tokenId) => {
    return jwt.sign({ tokenId }, config.secretKeyJwt, { expiresIn: '15m' });
};

const generateRefreshToken = (tokenId) => {
    return jwt.sign({ tokenId }, config.secretRefreshKeyJwt, { expiresIn: '7d' });
};

const saveRefreshToken = async (token, tokenId) => {
    await redisClient.set(tokenId, token, { EX: 7 * 24 * 3600 }); // TTL 7 hari
};

const getStoredRefreshToken = async (tokenId) => {
    return await redisClient.get(tokenId);
};


const removeRefreshToken = async (tokenId) => {
    await redisClient.del(tokenId);
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, config.secretKeyJwt);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.secretRefreshKeyJwt);
};

export default {
    login,
    generateAccessToken,
    generateRefreshToken,
    saveRefreshToken,
    getStoredRefreshToken,
    removeRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
