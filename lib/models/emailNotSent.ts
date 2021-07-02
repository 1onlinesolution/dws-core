import { ObjectId } from 'mongodb';
import DateTimeUtils from '../tools/dateTimeUtils';
import Validity from '../tools/validity';
import { IMongoIndexType } from './mongoIndexType';

export interface IEmailNotSent {
  _id: ObjectId;
  user_id: ObjectId;
  ip: string;
  application_name: string;
  message: string;
  error: Error | null;
  created_at: Date;
}

export class EmailNotSent implements IEmailNotSent {
  _id = new ObjectId();
  user_id = new ObjectId();
  ip = '';
  application_name = '';
  message = '';
  error = null;
  created_at = DateTimeUtils.currentUtcDate();

  constructor({
    _id = new ObjectId(),
    user_id = new ObjectId(),
    ip = '',
    application_name = '',
    message = '',
    error = null,
  } = {}) {
    this._id = _id;
    this.user_id = user_id;
    this.ip = ip;
    this.application_name = application_name;
    this.message = message;
    this.error = error;

    return this;
  }

  static checkForError(emailNotSent: IEmailNotSent): Error | null {
    if (!emailNotSent || !(emailNotSent instanceof EmailNotSent)) return new Error('invalid parameters');
    if (!Validity.isValidString(emailNotSent.ip)) return new Error('invalid IP address');
    if (!Validity.isValidString(emailNotSent.user_id.toHexString(), 2)) return new Error('invalid user');
    if (!Validity.isValidString(emailNotSent.application_name, 2)) return new Error('invalid application name');
    if (!Validity.isObject(emailNotSent.message)) return new Error('invalid email message');
    return null;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_email_not_sent_${postfix}`;
    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('ip_user_id'), {
        fieldOrSpec: { ip: 1, user_id: 1 },
        options: {
          name: createIndexName('ip_user_id'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('application_name'), {
        fieldOrSpec: { application_name: 1 },
        options: {
          name: createIndexName('application_name'),
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