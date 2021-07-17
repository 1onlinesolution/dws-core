import {
  ObjectId,
  Collection,
  IndexOptions,
  CommonOptions,
  FilterQuery,
  WithoutProjection,
  FindOneOptions,
  UpdateQuery,
  UpdateOneOptions,
  MongoCountPreferences,
  SortOptionObject,
  CollectionAggregationOptions,
  AggregationCursor,
  MongoCallback,
  OptionalId,
} from 'mongodb';
import { IMongoDatabase, MongoDatabase } from './mongoDatabase';
import { Validity } from '../tools';
import { IMongoIndexType } from '../models';

const DocumentsPerPage = 25;
const DefaultWriteOptions = {
  writeConcern: {
    w: 'majority',
    wtimeout: 100,
  },
};

export interface IMongoCollection {
  database: IMongoDatabase;
  name: string;
}

export class MongoCollection implements IMongoCollection {
  constructor(readonly database: IMongoDatabase, readonly name: string) {
    if (!database || !(database instanceof MongoDatabase) || !Validity.isValidString(database.name)) {
      throw new Error('invalid database or database name');
    }

    if (!Validity.isValidString(name)) throw new Error('invalid collection name');

    this.database = database;
    this.name = name;

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get collection(): Collection<any> {
    return this.database.database.collection(this.name);
  }

  async ensureCollectionExists(): Promise<void> {
    if (!(await this.database.collectionExists(this.name))) {
      await this.database.createCollection(this.name);
    }
  }

  indexExists(indexes: string | string[]): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      this.collection.indexExists(indexes, (err, result) => {
        if (err) {
          // For any error detected
          reject(err);
        } else {
          // When task is finished
          resolve(result);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createIndex(fieldOrSpec: string | any, options: IndexOptions): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      this.collection.createIndex(fieldOrSpec, options, (err, result) => {
        if (err) {
          // For any error detected
          reject(err);
        } else {
          // When task is finished
          resolve(result);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createIndexes(indexMap: Map<string, IMongoIndexType>): Promise<any> {
    if (!indexMap || indexMap.size === 0) return Promise.reject('Invalid collection index map');

    try {
      await this.ensureCollectionExists();
      const promises: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
      indexMap.forEach((value, key) => {
        this.indexExists(key).then((exist) => {
          if (typeof exist === 'boolean' && !exist) {
            const promise = this.createIndex(value.fieldOrSpec, value.options);
            promises.push(promise);
          }
        });
      });

      // Wait for all Promises to complete
      Promise.all<string | Error>(promises)
        .then((results) => {
          // Handle results
          return Promise.resolve(results);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // ===================================================================
  // insertOne operations
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  async insertOne<TSchema>(document: OptionalId<TSchema>, options = {}): Promise<any | null> {
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~insertOneWriteOpResult
    await this.checkDocument(document);
    const operationResult = await this.collection.insertOne(document, options);
    const { result, insertedId, insertedCount } = operationResult;
    const success = result.ok === 1 && insertedCount === 1;
    return success ? insertedId : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async insertOneWithWriteConcern<TSchema>(document: OptionalId<TSchema>, options = DefaultWriteOptions): Promise<any | null> {
    return await this.insertOne(document, options);
  }

  // ===================================================================
  // insertMany operations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async insertMany<TSchema>(documents: Array<OptionalId<TSchema>>, options = {}): Promise<any> {
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~insertOneWriteOpResult
    await this.checkDocuments(documents);
    const operationResult = await this.collection.insertMany(documents, options);
    const { result, insertedIds, insertedCount } = operationResult;
    const success = result.ok === 1 && insertedCount >= 1;
    return success ? insertedIds : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async insertManyWithWriteConcern<TSchema>(documents: Array<OptionalId<TSchema>>, options = DefaultWriteOptions): Promise<any> {
    return await this.insertMany(documents, options);
  }

  // ===================================================================
  // deleteOne operations
  async deleteOne<TSchema>(filter: FilterQuery<TSchema>, options?: CommonOptions & { bypassDocumentValidation?: boolean }): Promise<boolean | Error> {
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~deleteWriteOpCallback
    await this.checkFilter(filter);
    const operationResult = await this.collection.deleteOne(filter, options);
    const { result } = operationResult;
    return Promise.resolve(result.ok === 1 && result.n === 1);
  }

  async deleteOneWithWriteConcern<TSchema>(
    filter: FilterQuery<TSchema>,
    options?: CommonOptions & { bypassDocumentValidation?: boolean },
  ): Promise<boolean | Error> {
    await this.checkFilter(filter);
    return await this.deleteOne(filter, options);
  }

  // ===================================================================
  // findOne operations
  async findOne<TSchema>(filter: FilterQuery<TSchema> = {}, options?: WithoutProjection<FindOneOptions<TSchema>>): Promise<TSchema | null> {
    await this.checkFilter(filter);
    return await this.collection.findOne(filter, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findDocumentById(id: ObjectId): Promise<any | Error | null> {
    // id could be string !!!
    if (!id) return Promise.reject(new Error('invalid document id'));
    return await this.findOne({ _id: id });
  }

  // ===================================================================
  // updateOne operations
  async updateOne<TSchema>(
    filter: FilterQuery<TSchema>,
    update: UpdateQuery<TSchema> | Partial<TSchema>,
    options: UpdateOneOptions = { upsert: false },
  ): Promise<boolean> {
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~updateWriteOpCallback
    await this.checkFilter(filter);
    const updateWriteOpResult = await this.collection.updateOne(filter, update, options);
    const { result, matchedCount, modifiedCount } = updateWriteOpResult;
    return result.ok === 1 && result.n === 1 && result.nModified === 1 && matchedCount === 1 && modifiedCount === 1;
  }

  async updateOneWithWriteConcern<TSchema>(
    filter: FilterQuery<TSchema>,
    update: UpdateQuery<TSchema> | Partial<TSchema>,
    options: UpdateOneOptions = {
      upsert: false,
      writeConcern: {
        w: 'majority',
        wtimeout: 100,
      },
    },
  ): Promise<boolean> {
    return await this.updateOne(filter, update, options);
  }

  // ===================================================================
  // count operations
  async count<TSchema>(filter: FilterQuery<TSchema> = {}, options: MongoCountPreferences = {}): Promise<number | Error> {
    // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#countDocuments
    // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~countCallback
    await this.checkFilter(filter);
    try {
      // Returns the count of documents or error
      return await this.collection.countDocuments(filter, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // ===================================================================
  // find operations
  async find<TSchema>(filter: FilterQuery<TSchema> = {}, options: WithoutProjection<FindOneOptions<TSchema>> = {}): Promise<TSchema[]> {
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
    await this.checkFilter(filter);
    return await this.collection.find(filter, options).toArray();
  }

  async findAndSort<TSchema>(
    filter: FilterQuery<TSchema> = {},
    options: WithoutProjection<FindOneOptions<TSchema>> = {},
    keyOrList: string | Array<[string, number]> | SortOptionObject<TSchema> = {},
    direction?: number,
  ): Promise<TSchema[]> {
    // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
    await this.checkFilter(filter);
    return await this.collection.find(filter, options).sort(keyOrList, direction).toArray();
  }

  async findPage<TSchema>(filter: FilterQuery<TSchema> = {}, documentsPerPage: number = DocumentsPerPage, page = 1): Promise<TSchema[]> {
    await this.checkFilter(filter);
    const numItemsToSkip = (page - 1) * documentsPerPage;
    const newOptions = {
      limit: documentsPerPage,
      skip: numItemsToSkip,
    };
    return await this.find(filter, newOptions);
  }

  // ===================================================================
  // aggregate operations
  aggregate<TSchema>(
    // eslint-disable-next-line @typescript-eslint/ban-types
    pipeline: object[] | undefined,
    options?: CollectionAggregationOptions,
    callback?: MongoCallback<AggregationCursor<TSchema>>,
  ): AggregationCursor<TSchema> {
    return this.collection.aggregate(pipeline, options, callback);
  }

  // ===================================================================
  // checks
  checkFilter<TSchema>(filter: FilterQuery<TSchema>): Promise<boolean | Error> {
    return filter ? Promise.resolve(true) : MongoCollection.badRequestErrorAsPromise('filter');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  checkDocument(document: any): Promise<boolean | Error> {
    return document ? Promise.resolve(true) : MongoCollection.badRequestErrorAsPromise('document');
  }

  checkDocuments<TSchema>(documents: Array<OptionalId<TSchema>>): Promise<boolean | Error> {
    if (!documents) return MongoCollection.badRequestErrorAsPromise('documents');
    let index = 0;
    documents.forEach((item) => {
      if (!item) return MongoCollection.badRequestErrorAsPromise(`invalid document with index ${index}`);
      ++index;
    });
    return Promise.resolve(true);
  }

  static badRequestErrorAsPromise(label: string): Promise<Error> {
    const message = `Bad request: ${label}`;
    return Promise.reject(new Error(message));
  }
}
