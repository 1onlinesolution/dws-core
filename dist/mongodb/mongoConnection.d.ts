import { MongoClient, MongoClientOptions, Db } from 'mongodb';
export interface IMongoConnection {
    connectionString: string;
    options: MongoClientOptions;
    mongoClient: MongoClient;
}
export declare class MongoConnection implements IMongoConnection {
    private readonly _connectionString;
    private readonly _options;
    private readonly _mongoClient;
    constructor(connectionString: string, options?: MongoClientOptions);
    get mongoClient(): MongoClient;
    get options(): MongoClientOptions;
    get connectionString(): string;
    get isConnected(): boolean;
    connect(): Promise<MongoClient | Error>;
    close(): Promise<MongoClient | Error>;
    database(name: string, options?: {
        noListener: boolean;
        returnNonCachedInstance: boolean;
    }): Db;
}
