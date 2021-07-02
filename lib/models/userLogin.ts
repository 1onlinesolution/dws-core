import DateTimeUtils from '../tools/dateTimeUtils';
import { IMongoIndexType } from './mongoIndexType';
import Validity from '../tools/validity';

export interface IUserLogin {
  ip: string;
  email: string;
  created_at: Date;
}

export class UserLogin implements IUserLogin {
  ip = '';
  email = '';
  created_at = DateTimeUtils.currentUtcDate();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor({ ip = '', email = '' }) {
    this.ip = ip;
    this.email = email;

    return this;
  }

  static checkForError(userLogin: IUserLogin): Error | null {
    if (!userLogin || !(userLogin instanceof UserLogin)) return new Error('invalid user login details');
    if (!Validity.isValidString(userLogin.ip, 2)) return new Error('invalid IP address');
    if (!Validity.isValidString(userLogin.email, 2)) return new Error('invalid user email');
    return null;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_user_login_${postfix}`;
    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('email_ip'), {
        fieldOrSpec: { email: 1, ip: 1 },
        options: {
          name: createIndexName('email_ip'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('ip'), {
        fieldOrSpec: { ip: 1 },
        options: {
          name: createIndexName('ip'),
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
