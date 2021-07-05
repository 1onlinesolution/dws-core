import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import { DefaultConsoleOptions } from './defaultConsoleOptions';
import { printf } from './printf';

import 'winston-mongodb';

const { format } = winston;

export class ConsoleLogger extends BaseLogger {
  constructor(label = 'my label', level = 'info', options = DefaultConsoleOptions) {
    super(label, level, options);

    this.options.format = format.combine(
      format.label({ label: this.label }),
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
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
