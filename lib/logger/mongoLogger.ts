import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import { DefaultMongoOptions } from './defaultMongoOptions';
import { Validity } from '../tools';

import 'winston-mongodb';

export class MongoLogger extends BaseLogger {
  protected kind = 'mongo';

  constructor(options = DefaultMongoOptions, levels = BaseLogger.Levels) {
    super(options, levels);

    this.logger = this.initialize();
    return this;
  }

  initialize(): winston.Logger {
    if (this.logger) return this.logger;

    if (!Validity.isValidString(this.options.db) || !Validity.isValidString(this.options.collection)) BaseLogger.throwConfigError();

    this.usedTransports = [new winston.transports.MongoDB(this.options)];
    return super.initialize();
  }
}
