import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class FileLogger extends BaseLogger {
    constructor(options?: {
        label: string;
        level: string;
        filename: string;
        maxsize: number;
        maxFiles: number;
        tailable: boolean;
        maxRetries: number;
        zippedArchive: boolean;
        silent: boolean;
    }, levels?: winston.config.AbstractConfigSetLevels);
    initialize(): winston.Logger;
}
