import { Request, Response, NextFunction } from 'express';
import cacheService from '../service/cacheService';
import { logger } from '../utils/logger';

export default class CacheMiddleware {
  public static async get(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user_id'] as string;
    if (!userId) {
      res.send("Invalid user id!");
      return;
    }
    res.locals.userId = userId;
    const data = await cacheService.getCache(userId);
    if (data) {
      logger.info(`Data for user ${userId} found in cache!`);
      res.json(data);
      return;
    }
    logger.info(`Data not found, generating.`);
    next();
  }

  public static async set(_req: Request, res: Response) {
    const settingData = await cacheService.setCache(res.locals.userId, res.locals.userData);

    if (!settingData) {
      logger.error("Failed to set the data in cache!");
      return;
    }

    res.json(res.locals.userData);
  }
}