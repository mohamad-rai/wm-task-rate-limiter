import { createLogger, format, transports, Logger } from 'winston';

class AppLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      defaultMeta: { service: 'user-service'},
      transports: [
        new transports.File({ filename: './src/logs/error.log', level: 'error'}),
        new transports.File({ filename: './src/logs/combined.log'}),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: format.simple(),
      }));
    }
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }
}

export const logger = new AppLogger();