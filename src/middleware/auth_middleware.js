import { ResponseError } from "../error/response_erorr.js";
import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ResponseError(401, 'oke');
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
        if (err) {
            return next(new ResponseError(403, 'Token invalid'));
        }
        req.user = user;
        next();
    });
}