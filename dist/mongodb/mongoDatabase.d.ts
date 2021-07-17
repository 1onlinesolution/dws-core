import { Db } from 'mongodb';
export interface IMongoDatabase {
    connectionString: string;
    name: string;
    database: Db;
    ensureCollectionExists(collectionName: string): Promise<void>;
    collectionExists(collectionName: string): Promise<boolean>;
    createCollection(collectionName: string): Promise<void>;
}
export declare class MongoDatabase implements IMongoDatabase {
    private readonly _connectionString;
    private readonly _name;
    private readonly _mongoConnection;
    constructor(connectionString: string, name: string);
    get connectionString(): string;
    get name(): string;
    get isConnected(): boolean;
    get database(): Db;
    createCollection(collectionName: string): Promise<void>;
    ensureCollectionExists(collectionName: string): Promise<void>;
    collectionExists(collectionName: string): Promise<boolean>;
    connect(): Promise<void>;
    static isMongoError(error: Error): boolean;
    errorMessage(error: Error): string;
}
