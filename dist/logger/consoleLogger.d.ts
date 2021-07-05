import winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class ConsoleLogger extends BaseLogger {
    protected kind: string;
    constructor(options?: {
        label: string;
        level: string;
        silent: boolean;
        morganFormat: string;
    }, levels?: winston.config.AbstractConfigSetLevels);
    initialize(): winston.Logger;
}
