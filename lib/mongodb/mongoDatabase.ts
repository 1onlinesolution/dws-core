import { Db } from 'mongodb';
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

  static async createDatabase(
    name: string,
    connectionString: string,
    connectionOptions = {
      useUnifiedTopology: true,
    },
  ): Promise<MongoDatabase | Error> {
    try {
      const connection = new MongoConnection(connectionString, connectionOptions);
      await connection.connect();
      return new MongoDatabase(connection.connectionString, name);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
