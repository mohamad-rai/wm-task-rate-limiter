import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/userService';

export class UserController {
  public static async getData(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getData(res.locals.userId);
      res.locals.userData = data;
      next();
    } catch (error) {
      next(error);
    }
  }
}