import { IndexOptions } from 'mongodb';
export interface IMongoIndexType {
    fieldOrSpec: string | any;
    options: IndexOptions;
}
