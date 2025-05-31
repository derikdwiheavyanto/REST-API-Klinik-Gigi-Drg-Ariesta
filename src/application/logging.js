import winston from 'winston';
import { config } from '../config.js';

const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(
            { format: 'YYYY-MM-DD HH:mm:ss' }
        ),
        winston.format.colorize({
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'green',
                http: 'magenta',
            },
            all: true,
        }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} [${level}]: ${message} ${stack || ""}`
        })
    ),
    transports: [
        new winston.transports.Console({}),
    ]
})

export {
    logger
}