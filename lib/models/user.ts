import { ObjectId } from 'mongodb';
import { Validity, DateTimeUtils } from '../tools';
import { IUserStatistics, UserStatistics } from './userStatistics';
import { IMongoIndexType } from './mongoIndexType';

export enum UserRole {
  Customer = 0,
  Employee,
  Manager,
  SuperUser,
  Admin,
}

export interface UserPayload {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IUser {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  company_name: string;
  api_client_id: string;
  license: string;
  verified: boolean;
  isAdmin: boolean;
  hasAccess: boolean;
  roles: UserRole[];
  verification_token: string;
  newsletter: boolean;
  stats: IUserStatistics;
  api_client_secret: string;
  jwt_access_token: string;
  jwt_refresh_token: string;
  created_at: Date;
  modified_at: Date;
}

export class User implements IUser {
  _id = new ObjectId();
  hasAccess = true;
  first_name = '';
  last_name = '';
  user_name = '';
  email = '';
  password = '';
  company_name = '';
  license = '';
  roles = [UserRole.Customer];
  verified = false;
  verification_token = '';
  newsletter = true;
  stats = new UserStatistics();
  api_client_id = '';
  api_client_secret = '';
  jwt_access_token = '';
  jwt_refresh_token = '';
  created_at = DateTimeUtils.currentUtcDate();
  modified_at = this.created_at;

  constructor({
    _id = new ObjectId(),
    hasAccess = true,
    first_name = '',
    last_name = '',
    user_name = '',
    email = '',
    password = '',
    company_name = '',
    license = '',
    roles = [UserRole.Customer],
    verified = false,
    verification_token = '',
    newsletter = true,
    stats = new UserStatistics(),
    api_client_id = '',
    api_client_secret = '',
    jwt_access_token = '',
    jwt_refresh_token = '',
  } = {}) {
    this._id = _id;
    this.hasAccess = hasAccess;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_name = user_name;
    this.email = email;
    this.company_name = company_name;
    this.license = license;
    this.roles = roles;
    this.verified = verified;
    this.verification_token = verification_token;
    this.newsletter = newsletter;
    this.stats = stats;
    this.api_client_id = api_client_id;
    this.api_client_secret = api_client_secret;
    this.jwt_access_token = jwt_access_token;
    this.jwt_refresh_token = jwt_refresh_token;
    this.password = password;

    const error = User.checkForError(this);
    if (error) throw error;

    return this;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_user_${postfix}`;
    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('email'), {
        fieldOrSpec: { email: 1 },
        options: {
          name: createIndexName('email'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('user_name'), {
        fieldOrSpec: { user_name: 1 },
        options: {
          name: createIndexName('user_name'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('lastName_firstName'), {
        fieldOrSpec: { last_name: 1, first_name: 1 },
        options: {
          name: createIndexName('lastName_firstName'),
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('api_client_id'), {
        fieldOrSpec: { api_client_id: 1 },
        options: {
          name: createIndexName('api_client_id'),
          partialFilterExpression: { api_client_id: { $exists: true } },
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('jwt_access_token'), {
        fieldOrSpec: { jwt_access_token: 1 },
        options: {
          name: createIndexName('jwt_access_token'),
          partialFilterExpression: { jwt_access_token: { $exists: true } },
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('verified'), {
        fieldOrSpec: { verified: 1 },
        options: {
          name: createIndexName('verified'),
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

  static checkForError(user: User): Error | null {
    if (!user) return new Error('invalid user details');
    if (!Validity.isValidString(user.first_name, 2)) return new Error('invalid first name');
    if (!Validity.isValidString(user.last_name, 2)) return new Error('invalid last name');
    if (!Validity.isValidEmail(user.email)) return new Error('invalid email');
    if (!Validity.isValidString(user.user_name, 6)) return new Error('invalid user name');
    // Do not test the validity of the password, it will be done at an upper level
    if (!Validity.isValidString(user.password, 8)) return new Error('invalid password');
    return null;
  }

  static get clientIdLength(): number {
    return 16;
  }

  get fullName(): string {
    return `${this.first_name}, ${this.last_name}`;
  }

  get idAsString(): string {
    return `${this._id.toHexString()}`;
  }

  get isVerified(): boolean {
    return this.verified;
  }

  get getPayloadForToken(): UserPayload {
    return {
      id: this._id,
      first_name: this.first_name,
      api_client_id: this.api_client_id,
      license: this.license,
      verified: this.verified,
      isAdmin: this.isAdmin,
      hasAccess: this.hasAccess,
    };
  }

  get isApiClient(): boolean {
    return Validity.isValidString(this.api_client_id, 2) && Validity.isValidString(this.api_client_secret, 2);
  }

  get isCustomer(): boolean {
    return this.roles.includes(UserRole.Customer);
  }

  get isEmployee(): boolean {
    return this.roles.includes(UserRole.Employee);
  }

  get isManager(): boolean {
    return this.roles.includes(UserRole.Manager);
  }

  get isSuperUser(): boolean {
    return this.roles.includes(UserRole.SuperUser);
  }

  get isAdmin(): boolean {
    return this.roles.includes(UserRole.Admin);
  }

  get requiresVerification(): boolean {
    return !(this.verified && !this.verification_token);
  }

  get isBanned(): boolean {
    return !this.hasAccess;
  }

  banUser(): void {
    this.hasAccess = false;
  }
}
