import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class FileLogger extends BaseLogger {
    constructor(label?: string, level?: string, options?: {
        level: string;
        filename: string;
        maxsize: number;
        maxFiles: number;
        tailable: boolean;
        maxRetries: number;
        zippedArchive: boolean;
        silent: boolean;
    });
    initialize(): winston.Logger;
}
