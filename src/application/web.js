import express from 'express';
import { publicRouter } from '../routes/public_api.js';
import { errorMiddleware } from '../middleware/error_middleware.js';
import { privateRouter } from '../routes/api.js';
import cors from 'cors';


export const web = express();

web.use(cors())

web.use(express.json());
web.use(express.urlencoded({ extended: true }));


web.use(publicRouter)
web.use(privateRouter)

web.use("/uploads", express.static("uploads"));

web.use(errorMiddleware)