import { ObjectId } from 'mongodb';
import { ProductFeature } from './productFeature';
import { DateTimeUtils } from '../../tools';
import { IMongoIndexType } from '../mongoIndexType';

export enum ProductCategory {
  Generic,
  Analysis,
  Design,
  Management,
  Service,
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

export class Product implements IProduct {
  _id = new ObjectId();
  name = '';
  description = '';
  price = 0.0;
  features = [];
  category = ProductCategory.Generic;
  locked = false;
  created_at = DateTimeUtils.currentUtcDate();
  modified_at = this.created_at;

  constructor({
    _id = new ObjectId(),
    name = '',
    description = '',
    price = 0.0,
    features = [],
    category = ProductCategory.Generic,
    locked = false,
  } = {}) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.features = features;
    this.category = category;
    this.locked = locked;

    return this;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_product_${postfix}`;

    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('name'), {
        fieldOrSpec: { name: 1 },
        options: {
          name: createIndexName('name'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('name_features_label'), {
        fieldOrSpec: { name: 1, 'features.label': 1 },
        options: {
          name: createIndexName('name_features_label'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('price'), {
        fieldOrSpec: { price: 1 },
        options: {
          name: createIndexName('price'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('category'), {
        fieldOrSpec: { category: 1 },
        options: {
          name: createIndexName('category'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('created_at'), {
        fieldOrSpec: { created_at: 1 },
        options: {
          name: createIndexName('created_at'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      });

    return map;
  }
}
