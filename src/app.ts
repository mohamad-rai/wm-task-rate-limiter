import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { userRouter } from './router/userRouter';
import RateLimiter from './middleware/rateLimiter';
import { logger } from './utils/logger';
import cacheService from './service/cacheService';

const app = express();

app.use(express.json());
app.use(RateLimiter.limiter())
app.use('/api', userRouter);


app.use(errorHandler);

export async function shutdown() {
  logger.info("closing redis client.")
  await cacheService.close();
}

export default app;