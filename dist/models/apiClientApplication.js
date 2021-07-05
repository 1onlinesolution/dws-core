"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientApplication = void 0;
const mongodb_1 = require("mongodb");
const tools_1 = require("../tools");
class ApiClientApplication {
    constructor({ _id = new mongodb_1.ObjectId(), api_client_id = new mongodb_1.ObjectId(), application_name = '', application_description = '', website_url = '', return_url = '', authorization_code = '', authorization_code_expiration = tools_1.DateTimeUtils.currentUtcDate(), access_token = '', access_token_expires_in_seconds = tools_1.Converter.toSeconds('6m'), refresh_token = '', refresh_token_expires_in_seconds = tools_1.Converter.toSeconds('60m'), } = {}) {
        this._id = new mongodb_1.ObjectId();
        this.api_client_id = new mongodb_1.ObjectId();
        this.application_name = '';
        this.application_description = '';
        this.website_url = '';
        this.return_url = '';
        this.authorization_code = '';
        this.authorization_code_expiration = tools_1.DateTimeUtils.currentUtcDate();
        this.access_token = '';
        this.access_token_expires_in_seconds = tools_1.Converter.toSeconds('6m');
        this.refresh_token = '';
        this.refresh_token_expires_in_seconds = tools_1.Converter.toSeconds('60m');
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this.modified_at = this.created_at;
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
    static checkForError(apiClientApplication) {
        if (!apiClientApplication || !(apiClientApplication instanceof ApiClientApplication)) {
            return new Error('invalid API client details');
        }
        const sizeClientId = ApiClientApplication.ClientIdLength * 2;
        if (!tools_1.Validity.isValidString(apiClientApplication.api_client_id.toHexString(), sizeClientId))
            return new Error('invalid client identifier');
        if (!tools_1.Validity.isValidString(apiClientApplication.application_name))
            return new Error('invalid application name');
        if (!tools_1.Validity.isValidString(apiClientApplication.application_description))
            return new Error('invalid application description');
        if (!tools_1.Validity.isValidString(apiClientApplication.website_url))
            return new Error('invalid website URL');
        if (!tools_1.Validity.isValidString(apiClientApplication.return_url))
            return new Error('invalid return URL');
        return null;
    }
    static get indexMap() {
        const createIndexName = (postfix) => `index_apiClientApplication_${postfix}`;
        const map = new Map();
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
exports.ApiClientApplication = ApiClientApplication;
ApiClientApplication.ClientIdLength = 16;
//# sourceMappingURL=apiClientApplication.js.map