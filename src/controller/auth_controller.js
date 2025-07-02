import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response_erorr.js";
import authService from "../service/auth_service.js";
import { v4 as uuidv4 } from 'uuid';

const login = async (req, res, next) => {
    try {
        const data = await authService.login(req.body);


        const tokenId = `${data.username}:${uuidv4()}`;
        const accessToken = authService.generateAccessToken(tokenId);
        const refreshToken = authService.generateRefreshToken(tokenId);
        await authService.saveRefreshToken(refreshToken, tokenId);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 3600 * 1000 // 7 hari
        });

        res.status(200).json({
            data: {
                username: data.username,
                token: accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw new ResponseError(400, 'Refresh token is missing');
        }

        const payload = authService.verifyRefreshToken(refreshToken);
        const storedToken = await authService.getStoredRefreshToken(payload.tokenId);

        logger.info(`refreshToken: ${refreshToken}`,);
        logger.info(`storedToken ${storedToken}`);
        if (refreshToken !== storedToken) {
            throw new ResponseError(403, 'Invalid refresh token');
        }

        const accessToken = authService.generateAccessToken(payload.tokenId);
        res.status(200).json({
            data: {
                token: accessToken
            }
        });
        logger.info('Refresh token is valid');
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) throw new ResponseError(400, 'Refresh token not found');

        const payload = authService.verifyRefreshToken(refreshToken);
        await authService.removeRefreshToken(payload.tokenId);

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false, // ubah ke true jika menggunakan HTTPS
            sameSite: 'none',
        });

        res.status(200).json({ message: 'Logout success' });

    } catch (error) {
        next(error);
    }
};

export default {
    login,
    refreshToken,
    logout
};
