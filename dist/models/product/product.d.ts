import { ObjectId } from 'mongodb';
import { ProductFeature } from './productFeature';
import { IMongoIndexType } from '../mongoIndexType';
export declare enum ProductCategory {
    Generic = 0,
    Analysis = 1,
    Design = 2,
    Management = 3,
    Service = 4
}
export interface IProduct {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    features: ProductFeature[];
    category: ProductCategory;
    locked: boolean;
    created_at: Date;
    modified_at: Date;
}
export declare class Product implements IProduct {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    features: never[];
    category: ProductCategory;
    locked: boolean;
    created_at: Date;
    modified_at: Date;
    constructor({ _id, name, description, price, features, category, locked, }?: {
        _id?: ObjectId | undefined;
        name?: string | undefined;
        description?: string | undefined;
        price?: number | undefined;
        features?: never[] | undefined;
        category?: ProductCategory | undefined;
        locked?: boolean | undefined;
    });
    static get indexMap(): Map<string, IMongoIndexType>;
}
