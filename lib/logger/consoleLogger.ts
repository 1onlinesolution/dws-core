import winston from 'winston';
import { BaseLogger } from './baseLogger';
import { DefaultConsoleOptions } from './defaultConsoleOptions';
import { printf } from './printf';

import 'winston-mongodb';

const { format } = winston;

export class ConsoleLogger extends BaseLogger {
  constructor(options = DefaultConsoleOptions, levels = BaseLogger.Levels) {
    super(options, levels);

    this.options.format = format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.colorize({ all: true }),
      format.label({ label: this.label }),
      format.printf(printf),
    );

    this.logger = this.initialize();
    return this;
  }

  initialize(): winston.Logger {
    if (this.logger) return this.logger;

    this.usedTransports = [new winston.transports.Console(this.options)];
    return super.initialize();
  }
}
