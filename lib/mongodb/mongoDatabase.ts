import { Db, MongoError } from 'mongodb';
import { MongoConnection } from './mongoConnection';
import { Validity } from '../tools';

export interface IMongoDatabase {
  connectionString: string;
  name: string;
  database: Db;

  ensureCollectionExists(collectionName: string): Promise<void>;

  collectionExists(collectionName: string): Promise<boolean>;

  createCollection(collectionName: string): Promise<void>;
}

export class MongoDatabase implements IMongoDatabase {
  private readonly _connectionString: string;
  private readonly _name: string;
  private readonly _mongoConnection: MongoConnection;

  constructor(connectionString: string, name: string) {
    if (!Validity.isValidString(connectionString, 6)) throw new Error('invalid connection string');
    if (!Validity.isValidString(name)) throw new Error('invalid database name');

    this._connectionString = connectionString;
    this._name = name;
    this._mongoConnection = new MongoConnection(this._connectionString);

    return this;
  }

  get connectionString(): string {
    return this._connectionString;
  }

  get name(): string {
    return this._name;
  }

  get isConnected(): boolean {
    return this._mongoConnection.isConnected;
  }

  get database(): Db {
    return this._mongoConnection.database(this.name);
  }

  async createCollection(collectionName: string): Promise<void> {
    await this.ensureCollectionExists(collectionName);
  }

  async ensureCollectionExists(collectionName: string): Promise<void> {
    if (!(await this.collectionExists(collectionName))) {
      await this.database.createCollection(collectionName);
    }
  }

  async collectionExists(collectionName: string): Promise<boolean> {
    const collections = await this.database.listCollections({}, { nameOnly: true }).toArray();
    const collection = collections.find((o) => o.name === collectionName);
    return !!collection;
  }

  async connect(): Promise<void> {
    // * * * * *
    // N O T E : https://www.compose.com/articles/connection-pooling-with-mongodb/
    //           Do not use connect/close pair per each db action.
    //           Instead use one connection throughout the application.
    // * * * * *
    if (this.isConnected) return Promise.reject(new Error('Mongo client is already connected'));

    try {
      await this._mongoConnection.connect();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // === Error handling ===
  //

  static isMongoError(error: Error): boolean {
    return error.name === 'MongoError';
  }

  errorMessage(error: Error): string {
    if (MongoDatabase.isMongoError(error)) {
      const mongoError = error as MongoError;
      switch (mongoError.code) {
        case 11000:
          return 'attempt to insert a duplicate record in the database';

        default:
          return 'database error detected';
      }
    }

    return error.message;
  }
}
