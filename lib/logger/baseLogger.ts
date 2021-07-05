import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { printf } from './printf';

import 'winston-mongodb';

const { format, createLogger } = winston;

export class BaseLogger {
  readonly label: string;
  readonly level: string;
  usedTransports: Transport[];
  readonly options: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected logger: winston.Logger;

  private _stream: NodeJS.ReadableStream | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  constructor(label = 'my label', level = 'info', options?: any) {
    if (!options ||
      (options.level !== 'info' && options.level !== 'warn' && options.level !== 'error')) BaseLogger.throwConfigError();
    this.label = label;
    this.level = level;
    this.options = options;
    this.usedTransports = [];
    return this;
  }

  get stream(): NodeJS.ReadableStream | undefined {
    return this._stream;
  }

  protected static throwConfigError(): never {
    throw new Error('invalid configuration');
  }

  initialize(): winston.Logger {
    if (this.logger) return this.logger;

    const logger = createLogger({
      transports: this.usedTransports,
      exitOnError: false, // do not exit on handled exceptions
      format: format.combine(
        format.label({ label: this.label }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(printf),
      ),
    });

    // create a stream object with a 'write' function that will be used by `morgan`
    const streamOpts = {
      // use the 'info' log level so the output will be picked up by all transports (mongodb, file, and console)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      write: (message: any) => {
        logger.info(message);
      },
    };
    this._stream = logger.stream(streamOpts);

    return logger;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message: string, meta?: any[]): BaseLogger {
    this.logger.warn(message, meta);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message: string, meta?: any[]): BaseLogger {
    this.logger.info(message, meta);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, meta?: any[]): BaseLogger {
    this.logger.error(message, meta);
    return this;
  }
}
