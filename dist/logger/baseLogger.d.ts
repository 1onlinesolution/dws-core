/// <reference types="node" />
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import 'winston-mongodb';
export declare class BaseLogger {
    readonly label: string;
    readonly level: string;
    usedTransports: Transport[];
    readonly options: any;
    protected logger: winston.Logger;
    private _stream;
    constructor(label?: string, level?: string, options?: any);
    get stream(): NodeJS.ReadableStream | undefined;
    protected static throwConfigError(): never;
    initialize(): winston.Logger;
    warn(message: string, meta?: any[]): BaseLogger;
    info(message: string, meta?: any[]): BaseLogger;
    error(message: string, meta?: any[]): BaseLogger;
}
