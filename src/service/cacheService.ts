import { RedisClientType, createClient } from 'redis';
import { logger } from '../utils/logger';
import { DEFAULT_TTL, REDIS_URL } from '../utils/config';

type AnyObject = Record<string, string|boolean|number>;

class CacheService {
  private client: RedisClientType;

  constructor(){
    this.client = createClient({ url: REDIS_URL });
    this.client.on("error", (err) => {
      logger.error(err);
    });
    this.client.connect();
  }

  public async close() {
    this.client.quit();
  }

  public async getCache(userId: string): Promise<AnyObject | boolean> {
    const key = `cache:userID_${userId}`;

    try {
      const val = await this.client.get(key);
      if (!val) {
        return false;
      }

      return JSON.parse(val);
    } catch(err) {
      logger.error((<Error>err).message);
      return false;
    }
  }

  public async setCache(userId: string, data: AnyObject): Promise<boolean> {
    const key = `cache:userID_${userId}`;

    try {
      this.client.setEx(key, DEFAULT_TTL, JSON.stringify(data));
      return true;
    } catch(err) {
      logger.error((<Error>err).message);
      return false;
    }
  }
}

export default new CacheService();