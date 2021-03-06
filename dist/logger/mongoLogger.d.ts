import * as winston from 'winston';
import { BaseLogger } from './baseLogger';
import 'winston-mongodb';
export declare class MongoLogger extends BaseLogger {
    protected kind: string;
    constructor(options?: {
        label: string;
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
        name: undefined;
        metaKey: string;
        format: winston.Logform.Format;
        morganFormat: string;
    }, levels?: winston.config.AbstractConfigSetLevels);
    initialize(): winston.Logger;
}
