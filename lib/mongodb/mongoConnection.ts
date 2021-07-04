import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { Validity } from '../tools';

export interface IMongoConnection {
  connectionString: string;
  options: MongoClientOptions;
  mongoClient: MongoClient;
}

const DefaultMongoClientOptions: MongoClientOptions = {
  useUnifiedTopology: true,
};

export class MongoConnection implements IMongoConnection {
  private readonly _connectionString: string;
  private readonly _options: MongoClientOptions = DefaultMongoClientOptions;
  private readonly _mongoClient: MongoClient;

  constructor(connectionString: string, options = DefaultMongoClientOptions) {
    if (!Validity.isValidString(connectionString, 6)) throw new Error('invalid connection string');

    this._connectionString = connectionString;
    this._options = options;
    this._mongoClient = new MongoClient(this._connectionString, this._options);
    if (!this._mongoClient) throw new Error('cannot create mongo connection');

    return this;
  }

  get mongoClient(): MongoClient {
    return this._mongoClient;
  }

  get options(): MongoClientOptions {
    return this._options;
  }

  get connectionString(): string {
    return this._connectionString;
  }

  get isConnected(): boolean {
    return this._mongoClient.isConnected();
  }

  async connect(): Promise<MongoClient | Error> {
    // * * * * *
    // N O T E : https://www.compose.com/articles/connection-pooling-with-mongodb/
    //           Do not use connect/close pair per each db action.
    //           Instead use one connection throughout the application.
    // * * * * *
    if (this.isConnected) return Promise.reject(new Error('Mongo client is already connected'));

    try {
      await this._mongoClient.connect();
      return this._mongoClient;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async close(): Promise<MongoClient | Error> {
    if (!this.isConnected) return Promise.reject(new Error('Mongo client is not connected'));

    try {
      await this._mongoClient.close();
      return this._mongoClient;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  database(
    name: string,
    options = {
      noListener: false, // Do not make the db an event listener to the original connection.
      returnNonCachedInstance: false, // Control if you want to return a cached instance or have a new one created
    },
  ): Db {
    if (!Validity.isValidString(name)) throw new Error('invalid database name');

    return this._mongoClient.db(name, options);
  }
}
