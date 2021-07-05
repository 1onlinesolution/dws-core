"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotSent = void 0;
const mongodb_1 = require("mongodb");
const tools_1 = require("../tools");
class EmailNotSent {
    constructor({ _id = new mongodb_1.ObjectId(), user_id = new mongodb_1.ObjectId(), ip = '', application_name = '', message = '', error = null, } = {}) {
        this._id = new mongodb_1.ObjectId();
        this.user_id = new mongodb_1.ObjectId();
        this.ip = '';
        this.application_name = '';
        this.message = '';
        this.error = null;
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this._id = _id;
        this.user_id = user_id;
        this.ip = ip;
        this.application_name = application_name;
        this.message = message;
        this.error = error;
        return this;
    }
    static checkForError(emailNotSent) {
        if (!emailNotSent || !(emailNotSent instanceof EmailNotSent))
            return new Error('invalid parameters');
        if (!tools_1.Validity.isValidString(emailNotSent.ip))
            return new Error('invalid IP address');
        if (!tools_1.Validity.isValidString(emailNotSent.user_id.toHexString(), 2))
            return new Error('invalid user');
        if (!tools_1.Validity.isValidString(emailNotSent.application_name, 2))
            return new Error('invalid application name');
        if (!tools_1.Validity.isObject(emailNotSent.message))
            return new Error('invalid email message');
        return null;
    }
    static get indexMap() {
        const createIndexName = (postfix) => `index_email_not_sent_${postfix}`;
        const map = new Map();
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
exports.EmailNotSent = EmailNotSent;
//# sourceMappingURL=emailNotSent.js.map