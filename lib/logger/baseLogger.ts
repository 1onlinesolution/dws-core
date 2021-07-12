import morgan, { StreamOptions } from 'morgan';
import winston from 'winston';
import * as Transport from 'winston-transport';
import { PasswordService } from '../crypto';
import { printf } from './printf';

import 'winston-mongodb';
import { AbstractConfigSetLevels } from 'winston/lib/winston/config';

const { format, createLogger } = winston;

export abstract class BaseLogger {
  protected abstract kind: string;

  private static DefaultMorganFormat = ':method :url :status :res[content-length] - :response-time ms';

  // Define your severity levels.
  // With them, You can create log files,
  // see or hide levels based on the running ENV.
  protected static Levels: AbstractConfigSetLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  static Colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  readonly levels: AbstractConfigSetLevels;
  usedTransports: Transport[];
  readonly options: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected logger: winston.Logger;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  protected constructor(options: any, levels = BaseLogger.Levels) {
    if (!options) BaseLogger.throwConfigError();
    if (options.label === undefined) options.label = PasswordService.randomBytesAsToken(4);
    if (options.level === undefined) options.level = BaseLogger.DefaultLevel();
    if (options.level !== 'info' && options.level !== 'warn' && options.level !== 'error' && options.level !== 'http' && options.level !== 'debug') BaseLogger.throwConfigError();
    this.levels = levels;
    this.options = options;
    this.usedTransports = [];
    return this;
  }

  get label(): string {
    return this.options.label;
  }

  get level(): string {
    return this.options.level;
  }

  protected static throwConfigError(): never {
    throw new Error('invalid configuration');
  }

  combinedFormat(): winston.Logform.Format {
    if (this.kind === 'console') {
      return format.combine(

        // Add the message timestamp with the preferred format
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),

        // Tell Winston that the logs must be colored
        format.colorize({ all: true }),

        format.label({ label: this.label }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),

        // Define the format of the message showing the timestamp, the level and the message
        format.printf(printf),
      );
    }

    return format.combine(

      // Add the message timestamp with the preferred format
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),

      format.label({ label: this.label }),
      format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),

      // Define the format of the message showing the timestamp, the level and the message
      format.printf(printf),
    );
  }

  // Create the logger instance that has to be exported
  // and used to log messages.
  initialize(): winston.Logger {
    if (this.logger) return this.logger;

    return createLogger({
      level: this.level,
      levels: this.levels,
      transports: this.usedTransports,
      exitOnError: false, // do not exit on handled exceptions
      format: this.combinedFormat(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message: string, ...meta: any[]): BaseLogger {
    this.logger.warn(message, meta);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message: string, ...meta: any[]): BaseLogger {
    this.logger.info(message, meta);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, ...meta: any[]): BaseLogger {
    this.logger.error(message, meta);
    return this;
  }

  // This method set the current severity based on
  // the current NODE_ENV: show all the log levels
  // if the server was run in development mode; otherwise,
  // if it was run in production, show only warn and error messages.
  static DefaultLevel = (): string => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  morganMiddleware(): any {
    const morganFormat = this.options.morganFormat || BaseLogger.DefaultMorganFormat;

    // Override the stream method by telling
    // Morgan to use our custom logger instead of the console.log.
    const stream: StreamOptions = {
      // Use the http severity
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      write: (message: string, ...meta: any[]) => this.logger.http(message, meta),
    };

    // Skip all the Morgan http log if the
    // application is not running in development mode.
    // This method is not really needed here since
    // we already told to the logger that it should print
    // only warning and error messages in production.
    const skip = () => {
      const env = process.env.NODE_ENV || 'development';
      return env !== 'development';
    };

    return morgan(
      // Define message format string (this is the default one).
      // The message format is made from tokens, and each token is
      // defined inside the Morgan library.
      // You can create your custom token to show what do you want from a request.
      morganFormat,
      // Options: in this case, I overwrote the stream and the skip logic.
      // See the methods above.
      { stream, skip },
    );
  }
}

winston.addColors(BaseLogger.Colors);
