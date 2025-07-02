import express from 'express';
import { publicRouter } from '../routes/public_api.js';
import { errorMiddleware } from '../middleware/error_middleware.js';
import { privateRouter } from '../routes/api.js';
import cors from 'cors';
import { morganMiddleware } from '../middleware/morgan_middleware.js';
import cookieParser from 'cookie-parser';
import { config } from '../config.js';


export const web = express();

web.use(cors({
    origin: config.originCorsUrl,
    credentials: true,
}))
web.use(cookieParser())

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(morganMiddleware)


web.use("/api/uploads", express.static("uploads"));

web.use("/api", publicRouter)
web.use("/api", privateRouter)


web.use(errorMiddleware)