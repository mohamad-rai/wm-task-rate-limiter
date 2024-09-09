import rateLimit from 'express-rate-limit';
import { Request } from 'express';


export default class RateLimiter {
  public static limiter() {
    return rateLimit({
      windowMs: 60 * 1000,
      max: 10,
      keyGenerator: (req: Request): string => {
        if (req.headers['userId']) {
          if (Array.from(req.headers['userId'])) {
            return req.headers['userId'][0]
          } else
          return <string>req.headers['userId'];
        }
        return '-1';
      },
      message: "Too many requests, please try again later",
      statusCode: 429,
    })
  }
}