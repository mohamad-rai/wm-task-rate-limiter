import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { userRouter } from './router/userRouter';
import RateLimiter from './middleware/rateLimiter';

const app = express();

app.use(express.json());
app.use(RateLimiter.limiter())
app.use('/api', userRouter);


app.use(errorHandler);

export default app;