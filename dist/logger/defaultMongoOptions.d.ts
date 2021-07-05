import * as winston from 'winston';
declare const DefaultMongoOptions: {
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
};
export { DefaultMongoOptions };
