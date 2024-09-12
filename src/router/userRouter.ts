import { Router } from 'express';
import { UserController } from '../controller/userController';
import CacheMiddleware from '../middleware/cache';

export const userRouter = Router();

userRouter.get('/data', CacheMiddleware.get, UserController.getData, CacheMiddleware.set);