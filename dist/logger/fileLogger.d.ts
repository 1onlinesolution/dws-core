import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class FileLogger extends BaseLogger {
    protected kind: string;
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
        morganFormat: string;
    }, levels?: winston.config.AbstractConfigSetLevels);
    initialize(): winston.Logger;
}
