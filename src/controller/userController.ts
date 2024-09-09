import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/userService';

export class UserController {
  public static getData(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserService.getData();
      res.json(data);
      next();
    } catch (error) {
      next(error);
    }
  }
}