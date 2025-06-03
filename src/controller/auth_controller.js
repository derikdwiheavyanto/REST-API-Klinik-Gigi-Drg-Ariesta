import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response_erorr.js";
import authService from "../service/auth_service.js";

const login = async (req, res, next) => {
    try {
        const data = await authService.login(req.body);
        const refreshToken = authService.generateRefreshToken(data.username);
        await authService.saveRefreshToken(refreshToken, data.username);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 3600 * 1000 // 7 hari
        });

        res.status(200).json({
            data: data
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
        const storedToken = await authService.getStoredRefreshToken(payload.username);

        logger.info(`refreshToken: ${refreshToken}`,);
        logger.info(`storedToken ${storedToken}`);
        if (refreshToken !== storedToken) {
            throw new ResponseError(403, 'Invalid refresh token');
        }

        const accessToken = authService.generateAccessToken(payload.username);
        res.status(200).json({
            data: {
                username: payload.username,
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
        await authService.removeRefreshToken(payload.username);

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
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
