import { PrismaClient } from '@prisma/client';
import { logger } from './logging.js';
import redis from 'redis';
import { config } from '../config.js';


export const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});



prismaClient.$on('error', (e) => {
  logger.error(e.message);
})
prismaClient.$on('warn', (e) => {
  logger.warn(e.message);
})
prismaClient.$on('info', (e) => {
  logger.info(e.message);
})



export const redisClient = redis.createClient(
  {
    url: config.redisUrl
  }
);


redisClient.on('error', async (err) => {
  logger.error('❌ Redis Client Error:', err);
  redisClient.destroy();
});

redisClient.on('end', () => {
  logger.error('❌ Redis Client Disconnected');
});

redisClient.on('connect', () => {
  logger.info('✅ Redis Client Connected');
});






