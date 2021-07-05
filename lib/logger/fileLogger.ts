import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import { DefaultFileOptions } from './defaultFileOptions';
import { Validity } from '../tools';

import 'winston-mongodb';

export class FileLogger extends BaseLogger {
  constructor(label = 'my label', level = 'info', options = DefaultFileOptions) {
    super(label, level, options);

    this.logger = this.initialize();
    return this;
  }

  initialize(): winston.Logger {
    if (this.logger) return this.logger;

    if (!Validity.isValidString(this.options.filename)) BaseLogger.throwConfigError();

    this.usedTransports = [new winston.transports.File(this.options)];
    return super.initialize();
  }
}
