import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}

const isProduction = process.env.NODE_ENV === 'production';
const logLevel = isProduction ? LogLevel.INFO : LogLevel.DEBUG;
const timestampFormat = winston.format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss',
});

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: logLevel,
          format: isProduction
            ? winston.format.simple()
            : winston.format.combine(
                timestampFormat,
                winston.format.colorize({ all: true }),
                utilities.format.nestLike('goerlifaucet', {
                  prettyPrint: true,
                }),
              ),
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.combine(
            timestampFormat,
            winston.format.printf(
              (info) =>
                `[${info.timestamp}] [${info.level.toUpperCase()}]: ${
                  info.message
                }`,
            ),
          ),
          level: logLevel,
          datePattern: 'YYYY-MM-DD',
          dirname: './logs',
          filename: '%DATE%.log',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
        }),
      ],
    }),
  ],
})
export class LoggerModule {}
