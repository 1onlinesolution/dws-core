import { ObjectId, Collection, IndexOptions, CommonOptions, FilterQuery, WithoutProjection, FindOneOptions, UpdateQuery, UpdateOneOptions, MongoCountPreferences, SortOptionObject, CollectionAggregationOptions, AggregationCursor, MongoCallback, OptionalId } from 'mongodb';
import { IMongoDatabase } from './mongoDatabase';
import { IMongoIndexType } from '../models';
export interface IMongoCollection {
    database: IMongoDatabase;
    name: string;
}
export declare class MongoCollection implements IMongoCollection {
    readonly database: IMongoDatabase;
    readonly name: string;
    constructor(database: IMongoDatabase, name: string);
    get collection(): Collection<any>;
    ensureCollectionExists(): Promise<void>;
    indexExists(indexes: string | string[]): Promise<boolean | Error>;
    createIndex(fieldOrSpec: string | any, options: IndexOptions): Promise<string | Error>;
    createIndexes(indexMap: Map<string, IMongoIndexType>): Promise<any>;
    insertOne<TSchema>(document: OptionalId<TSchema>, options?: {}): Promise<any | null>;
    insertOneWithWriteConcern<TSchema>(document: OptionalId<TSchema>, options?: {
        writeConcern: {
            w: string;
            wtimeout: number;
        };
    }): Promise<any | null>;
    insertMany<TSchema>(documents: Array<OptionalId<TSchema>>, options?: {}): Promise<any>;
    insertManyWithWriteConcern<TSchema>(documents: Array<OptionalId<TSchema>>, options?: {
        writeConcern: {
            w: string;
            wtimeout: number;
        };
    }): Promise<any>;
    deleteOne<TSchema>(filter: FilterQuery<TSchema>, options?: CommonOptions & {
        bypassDocumentValidation?: boolean;
    }): Promise<boolean | Error>;
    deleteOneWithWriteConcern<TSchema>(filter: FilterQuery<TSchema>, options?: CommonOptions & {
        bypassDocumentValidation?: boolean;
    }): Promise<boolean | Error>;
    findOne<TSchema>(filter?: FilterQuery<TSchema>, options?: WithoutProjection<FindOneOptions<TSchema>>): Promise<TSchema | null>;
    findDocumentById(id: ObjectId): Promise<any | Error | null>;
    updateOne<TSchema>(filter: FilterQuery<TSchema>, update: UpdateQuery<TSchema> | Partial<TSchema>, options?: UpdateOneOptions): Promise<boolean>;
    updateOneWithWriteConcern<TSchema>(filter: FilterQuery<TSchema>, update: UpdateQuery<TSchema> | Partial<TSchema>, options?: UpdateOneOptions): Promise<boolean>;
    count<TSchema>(filter?: FilterQuery<TSchema>, options?: MongoCountPreferences): Promise<number | Error>;
    find<TSchema>(filter?: FilterQuery<TSchema>, options?: WithoutProjection<FindOneOptions<TSchema>>): Promise<TSchema[]>;
    findAndSort<TSchema>(filter?: FilterQuery<TSchema>, options?: WithoutProjection<FindOneOptions<TSchema>>, keyOrList?: string | Array<[string, number]> | SortOptionObject<TSchema>, direction?: number): Promise<TSchema[]>;
    findPage<TSchema>(filter?: FilterQuery<TSchema>, documentsPerPage?: number, page?: number): Promise<TSchema[]>;
    aggregate<TSchema>(pipeline: object[] | undefined, options?: CollectionAggregationOptions, callback?: MongoCallback<AggregationCursor<TSchema>>): AggregationCursor<TSchema>;
    checkFilter<TSchema>(filter: FilterQuery<TSchema>): Promise<boolean | Error>;
    checkDocument(document: any): Promise<boolean | Error>;
    checkDocuments<TSchema>(documents: Array<OptionalId<TSchema>>): Promise<boolean | Error>;
    static badRequestErrorAsPromise(label: string): Promise<Error>;
}
