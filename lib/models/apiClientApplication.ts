import { ObjectId } from 'mongodb';
import DateTimeUtils from '../tools/dateTimeUtils';
import Converter from '../tools/converter';
import Validity from '../tools/validity';
import { IMongoIndexType } from './mongoIndexType';

export interface IApiClientApplicationPayload {
  _id: ObjectId;
  api_client_id: ObjectId;
  application_name: string;
  website_url: string;
  return_url: string;
}

export interface IApiClientApplication extends IApiClientApplicationPayload {
  application_description: string;
  authorization_code: string;
  authorization_code_expiration: Date;
  access_token: string;
  access_token_expires_in_seconds: number;
  refresh_token: string;
  refresh_token_expires_in_seconds: number;
  created_at: Date;
  modified_at: Date;
}

export class ApiClientApplication implements IApiClientApplication {
  private static ClientIdLength = 16;
  _id = new ObjectId();
  api_client_id = new ObjectId();
  application_name = '';
  application_description = '';
  website_url = '';
  return_url = '';
  authorization_code = '';
  authorization_code_expiration = DateTimeUtils.currentUtcDate();
  access_token = '';
  access_token_expires_in_seconds = Converter.toSeconds('6m') as number;
  refresh_token = '';
  refresh_token_expires_in_seconds = Converter.toSeconds('60m') as number;
  created_at = DateTimeUtils.currentUtcDate();
  modified_at = this.created_at;

  constructor({
    _id = new ObjectId(),
    api_client_id = new ObjectId(),
    application_name = '',
    application_description = '',
    website_url = '',
    return_url = '',
    authorization_code = '',
    authorization_code_expiration = DateTimeUtils.currentUtcDate(),
    access_token = '',
    access_token_expires_in_seconds = Converter.toSeconds('6m') as number,
    refresh_token = '',
    refresh_token_expires_in_seconds = Converter.toSeconds('60m') as number,
  } = {}) {
    this._id = _id;
    this.api_client_id = api_client_id;
    this.application_name = application_name;
    this.application_description = application_description;
    this.website_url = website_url;
    this.return_url = return_url;
    this.authorization_code = authorization_code;
    this.authorization_code_expiration = authorization_code_expiration;
    this.access_token = access_token;
    this.access_token_expires_in_seconds = access_token_expires_in_seconds;
    this.refresh_token = refresh_token;
    this.refresh_token_expires_in_seconds = refresh_token_expires_in_seconds;

    return this;
  }

  static checkForError(apiClientApplication: IApiClientApplication): Error | null {
    if (!apiClientApplication || !(apiClientApplication instanceof ApiClientApplication)) {
      return new Error('invalid API client details');
    }

    const sizeClientId = ApiClientApplication.ClientIdLength * 2;
    if (!Validity.isValidString(apiClientApplication.api_client_id.toHexString(), sizeClientId)) return new Error('invalid client identifier');
    if (!Validity.isValidString(apiClientApplication.application_name)) return new Error('invalid application name');
    if (!Validity.isValidString(apiClientApplication.application_description)) return new Error('invalid application description');
    if (!Validity.isValidString(apiClientApplication.website_url)) return new Error('invalid website URL');
    if (!Validity.isValidString(apiClientApplication.return_url)) return new Error('invalid return URL');
    return null;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_apiClientApplication_${postfix}`;
    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('api_client_id_application_name_website_url'), {
        fieldOrSpec: { api_client_id: 1, application_name: 1, website_url: 1 },
        options: {
          name: createIndexName('api_client_id_application_name_website_url'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('application_name_website_url'), {
        fieldOrSpec: { application_name: 1, website_url: 1 },
        options: {
          name: createIndexName('application_name_website_url'),
          unique: true,
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('authorization_code'), {
        fieldOrSpec: { authorization_code: 1 },
        options: {
          name: createIndexName('authorization_code'),
          partialFilterExpression: { authorization_code: { $exists: true } },
          background: true,
          // writeConcern: {w: 'majority', wtimeout: 100},
        },
      })
      .set(createIndexName('refresh_token'), {
        fieldOrSpec: { refresh_token: 1 },
        options: {
          name: createIndexName('refresh_token'),
          partialFilterExpression: { refresh_token: { $exists: true } },
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
