import { IndexOptions } from 'mongodb';

export interface IMongoIndexType {
  fieldOrSpec: string | any; // eslint-disable-line @typescript-eslint/no-explicit-any
  options: IndexOptions;
}
