import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

// const logFileName = 'app';
// const dirname = '.logs';
const isProduction = process.env.NODE_ENV === 'production';

const logger = createLogger({
  // level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: format.combine(format.timestamp(), format.json()),
  // defaultMeta: {
  //   service: 'beauticianapp',
  // },
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize({
          all: true,
        }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.printf(({ level, message, timestamp }) => getLogMessage(level, message, timestamp)),
      ),
    }),
    // new transports.DailyRotateFile({
    //   filename: `${logFileName}-%DATE%.log`,
    //   dirname,
    //   level: 'info',
    //   datePattern: 'YYYY-MM-DD',
    //   maxSize: '5m',
    //   maxFiles: '7d',
    //   format: format.combine(
    //     format.timestamp({
    //       format: 'YYYY-MM-DD HH:mm:ss',
    //     }),
    //     format.errors({ stack: true }),
    //     format.splat(),
    //     format.printf(({ level, message, timestamp }) => `${timestamp}|${level}:${message}`),
    //   ),
    // }),
    // new transports.DailyRotateFile({
    //   filename: `${logFileName}-errors-%DATE%.log`,
    //   dirname: `${dirname}/erros`,
    //   level: 'error',
    //   datePattern: 'YYYY-MM-DD',
    //   maxSize: '5m',
    //   maxFiles: '7d',
    // }),
  ],
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error });
  process.exit(1); // exit the process to avoid undefined states
});

function getLogMessage(level: string, message: string, timestamp: string): string {
  return `[${isProduction ? timestamp : chalk.gray(timestamp)} | ${level}] ${
    isProduction ? message : chalk.cyan(message)
  }`;
}

// logger.info(`Starting logger for environment: ${process.env.NODE_ENV}`);

export default logger;
