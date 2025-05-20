import { ResponseError } from "../error/response_erorr.js";


export const errorMiddleware = (err, req, res, next) => {

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message });
    }

}