import { Router } from 'express';
import { UserController } from '../controller/userController';

export const userRouter = Router();

userRouter.get('/data', UserController.getData);