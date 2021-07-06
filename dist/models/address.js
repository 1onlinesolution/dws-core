"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongodb_1 = require("mongodb");
const tools_1 = require("../tools");
class Address {
    constructor({ _id = new mongodb_1.ObjectId(), user_id = new mongodb_1.ObjectId(), line1 = '', line2 = '', line3 = '', postCode = '', city = '', country = '', state = '', isDefault = false, isBilling = false, isShipping = false, } = {}) {
        this._id = new mongodb_1.ObjectId();
        this.user_id = new mongodb_1.ObjectId();
        this.line1 = '';
        this.line2 = '';
        this.line3 = '';
        this.postCode = '';
        this.city = '';
        this.state = '';
        this.country = '';
        this.isDefault = false;
        this.isBilling = false;
        this.isShipping = false;
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this.modified_at = this.created_at;
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
    toString() {
        let text = this.line1;
        if (text.length > 0 && this.line2)
            text = `${text}, ${this.line2}`;
        if (text.length > 0 && this.line3)
            text = `${text}, ${this.line3}`;
        if (text.length > 0 && this.postCode)
            text = `${text}, ${this.postCode}`;
        if (text.length > 0 && this.city)
            text = `${text}, ${this.city}`;
        if (text.length > 0 && this.state !== '')
            text = `${text}, ${this.state}`;
        if (text.length > 0 && this.country)
            text = `${text}, ${this.country}`;
        return text;
    }
    static checkForError(address) {
        if (!address || !(address instanceof Address))
            return new Error('invalid address');
        if (!tools_1.Validity.isValidString(address.user_id.toHexString()))
            return new Error('invalid user identifier');
        // eslint-disable-next-line quotes
        const messageLine1 = "invalid address: field 'line1'";
        if (tools_1.Validity.isUndefinedOrEmptyString(address.line1) && (tools_1.Validity.isValidString(address.line2) || tools_1.Validity.isValidString(address.line3)))
            return new Error(messageLine1);
        if (tools_1.Validity.isValidString(address.line1) &&
            (tools_1.Validity.isUndefinedOrEmptyString(address.postCode) ||
                tools_1.Validity.isUndefinedOrEmptyString(address.city) ||
                tools_1.Validity.isUndefinedOrEmptyString(address.country)))
            return new Error(messageLine1);
        if (address.country === 'US' && !tools_1.Validity.isValidString(address.state, 2, 2))
            return new Error('invalid state');
        if (!tools_1.Validity.isBoolean(address.isDefault) || !tools_1.Validity.isBoolean(address.isBilling) || !tools_1.Validity.isBoolean(address.isShipping))
            return new Error('Invalid address flags');
        return null;
    }
    static get indexMap() {
        const createIndexName = (postfix) => `index_address_${postfix}`;
        const map = new Map();
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
exports.Address = Address;
//# sourceMappingURL=address.js.map