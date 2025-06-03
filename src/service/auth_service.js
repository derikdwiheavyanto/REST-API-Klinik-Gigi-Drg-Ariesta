import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response_erorr.js";
import { loginUserValidation } from "../validation/login_validation.js";
import { validate } from "../validation/validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import redis from "redis";

// 🔌 Setup Redis
const redisClient = redis.createClient(
    {
        url: config.redisUrl
    }
);
redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err);
});

await redisClient.connect();

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findFirst({
        where: { username: loginRequest.username },
        select: { username: true, password: true }
    });

    if (!user) throw new ResponseError(401, "username or password wrong");

    const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordMatch) throw new ResponseError(401, "username or password wrong");

    const accessToken = generateAccessToken(user.username);
    return { username: user.username, token: accessToken };
};

const generateAccessToken = (username) => {
    return jwt.sign({ username }, config.secretKeyJwt, { expiresIn: '15m' });
};

const generateRefreshToken = (username) => {
    return jwt.sign({ username }, config.secretRefreshKeyJwt, { expiresIn: '7d' });
};

const saveRefreshToken = async (token, username) => {
    await redisClient.set(username, token, { EX: 7 * 24 * 3600 }); // TTL 7 hari
};

const getStoredRefreshToken = async (username) => {
    return await redisClient.get(username);
};

const removeRefreshToken = async (username) => {
    await redisClient.del(username);
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
