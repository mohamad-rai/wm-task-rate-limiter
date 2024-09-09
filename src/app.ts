import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { userRouter } from './router/userRouter';

const app = express();

app.use(express.json());
app.use('/api', userRouter);


app.use(errorHandler);

export default app;