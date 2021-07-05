import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class ConsoleLogger extends BaseLogger {
    constructor(label?: string, level?: string, options?: {
        label: undefined;
        level: string;
        silent: boolean;
    });
    initialize(): winston.Logger;
}
