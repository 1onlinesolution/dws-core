import { ObjectId } from 'mongodb';
import { IMongoIndexType } from './mongoIndexType';
import { Validity, DateTimeUtils } from '../tools';

export interface IAddress {
  _id: ObjectId;
  user_id: ObjectId;
  line1: string;
  line2: string;
  line3: string;
  postCode: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
  isBilling: boolean;
  isShipping: boolean;
  created_at: Date;
  modified_at: Date;
}

export class Address implements IAddress {
  _id = new ObjectId();
  user_id = new ObjectId();
  line1 = '';
  line2 = '';
  line3 = '';
  postCode = '';
  city = '';
  state = '';
  country = '';
  isDefault = false;
  isBilling = false;
  isShipping = false;
  created_at = DateTimeUtils.currentUtcDate();
  modified_at = this.created_at;

  constructor({
    _id = new ObjectId(),
    user_id = new ObjectId(),
    line1 = '',
    line2 = '',
    line3 = '',
    postCode = '',
    city = '',
    country = '',
    state = '',
    isDefault = false,
    isBilling = false,
    isShipping = false,
  } = {}) {
    this._id = _id;
    this.user_id = user_id;
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
    this.postCode = postCode;
    this.city = city;
    this.country = country;
    this.state = state;
    this.isDefault = isDefault;
    this.isBilling = isBilling;
    this.isShipping = isShipping;

    return this;
  }

  toString(): string {
    let text = this.line1;
    if (text.length > 0 && this.line2) text = `${text}, ${this.line2}`;
    if (text.length > 0 && this.line3) text = `${text}, ${this.line3}`;
    if (text.length > 0 && this.postCode) text = `${text}, ${this.postCode}`;
    if (text.length > 0 && this.city) text = `${text}, ${this.city}`;
    if (text.length > 0 && this.state !== '') text = `${text}, ${this.state}`;
    if (text.length > 0 && this.country) text = `${text}, ${this.country}`;
    return text;
  }

  static checkForError(address: IAddress): Error | null {
    if (!address || !(address instanceof Address)) return new Error('invalid address');

    if (!Validity.isValidString(address.user_id.toHexString())) return new Error('invalid user identifier');

    // eslint-disable-next-line quotes
    const messageLine1 = "invalid address: field 'line1'";
    if (Validity.isUndefinedOrEmptyString(address.line1) && (Validity.isValidString(address.line2) || Validity.isValidString(address.line3)))
      return new Error(messageLine1);

    if (
      Validity.isValidString(address.line1) &&
      (Validity.isUndefinedOrEmptyString(address.postCode) ||
        Validity.isUndefinedOrEmptyString(address.city) ||
        Validity.isUndefinedOrEmptyString(address.country))
    )
      return new Error(messageLine1);

    if (address.country === 'US' && !Validity.isValidString(address.state, 2, 2)) return new Error('invalid state');

    if (!Validity.isBoolean(address.isDefault) || !Validity.isBoolean(address.isBilling) || !Validity.isBoolean(address.isShipping))
      return new Error('Invalid address flags');

    return null;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_address_${postfix}`;
    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('userId_country_city_postCode_line1'), {
        fieldOrSpec: { user_id: 1, country: 1, city: 1, postCode: 1, line1: 1 },
        options: {
          name: createIndexName('userId_country_city_postCode_line1'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('userId_country_state_city_postCode_line1'), {
        fieldOrSpec: { user_id: 1, country: 1, state: 1, city: 1, postCode: 1, line1: 1 },
        options: {
          name: createIndexName('userId_country_state_city_postCode_line1'),
          partialFilterExpression: { state: { $exists: true } },
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('country'), {
        fieldOrSpec: { country: 1 },
        options: {
          name: createIndexName('country'),
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
      })
      .set(createIndexName('modified_at'), {
        fieldOrSpec: { modified_at: 1 },
        options: {
          name: createIndexName('modified_at'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      });

    return map;
  }
}
