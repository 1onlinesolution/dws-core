import winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class ConsoleLogger extends BaseLogger {
    constructor(options?: {
        label: string;
        level: string;
        silent: boolean;
    }, levels?: winston.config.AbstractConfigSetLevels);
    initialize(): winston.Logger;
}
