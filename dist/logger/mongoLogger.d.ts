import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class MongoLogger extends BaseLogger {
    constructor(label?: string, level?: string, options?: {
        level: string;
        db: string;
        options: {
            poolSize: number;
            useNewUrlParser: boolean;
            useUnifiedTopology: boolean;
        };
        collection: string;
        storeHost: boolean;
        capped: boolean;
        cappedMax: number;
        silent: boolean;
        decolorize: boolean;
        includeIds: boolean;
        label: undefined;
        name: undefined;
        metaKey: string;
        format: winston.Logform.Format;
    });
    initialize(): winston.Logger;
}
