import winston from 'winston';
import { addColors } from 'winston';

/* Adds a side effect to the error logs
 * The piped messages from Symbol.for() have color meta wrappers
 * To bypass this behaviour, always JSON.stringify() logger.error outputs */

addColors({
  info: 'green',
  debug: 'yellow',
  warn: 'italic black yellowBG',
  error: 'bold black redBG',
  http: 'grey',
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.label({ label: 'server' }),
    winston.format.simple(),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label'],
    }),
    winston.format.splat(),
    process.env.NODE_ENV == 'development'
      ? winston.format.colorize({ all: true })
      : winston.format.colorize({ level: true }),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
    winston.format.printf((info) => {
      return `[${info.level}:${info.timestamp}] ${info.message} [${info.label}-${JSON.stringify({
        error: info.metadata.error,
        stack: info.metadata.stack,
      })}]`;
    })
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      silent: false,
      debugStdout: true,
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: './error.log',
      level: 'error',
    }),
  ],
});

export default logger;
