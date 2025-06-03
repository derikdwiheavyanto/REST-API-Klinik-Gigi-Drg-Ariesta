import { ResponseError } from "../error/response_erorr.js";
import authService from "../service/auth_service.js";


export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new ResponseError(403, 'Token invalid'));
        }

        const token = authHeader.split(' ')[1]

        const payload = authService.verifyAccessToken(token);
        req.user = payload;
        next()
    } catch (error) {
        return next(new ResponseError(401, error.message));
    }
}