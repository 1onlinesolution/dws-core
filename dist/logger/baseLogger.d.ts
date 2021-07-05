import winston from 'winston';
import * as Transport from 'winston-transport';
import 'winston-mongodb';
import { AbstractConfigSetLevels } from 'winston/lib/winston/config';
export declare class BaseLogger {
    protected static Levels: AbstractConfigSetLevels;
    static Colors: {
        error: string;
        warn: string;
        info: string;
        http: string;
        debug: string;
    };
    readonly levels: AbstractConfigSetLevels;
    usedTransports: Transport[];
    readonly options: any;
    protected logger: winston.Logger;
    constructor(options: any, levels?: winston.config.AbstractConfigSetLevels);
    get label(): string;
    get level(): string;
    protected static throwConfigError(): never;
    combinedFormat(): winston.Logform.Format;
    initialize(): winston.Logger;
    warn(message: string, ...meta: any[]): BaseLogger;
    info(message: string, ...meta: any[]): BaseLogger;
    error(message: string, ...meta: any[]): BaseLogger;
    static DefaultLevel: () => string;
    morganMiddleware(): any;
}
