import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ResponseError } from "../error/response_erorr.js";


export const errorMiddleware = (err, req, res, next) => {

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof PrismaClientKnownRequestError) {
        res.status(500).json({
            errorCode: err.code,
            message: err.message
        });
    } else {
        res.status(500).json({
            message: err.message
        });
    }

}