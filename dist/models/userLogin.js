"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const tools_1 = require("../tools");
class UserLogin {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor({ ip = '', email = '' }) {
        this.ip = '';
        this.email = '';
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this.ip = ip;
        this.email = email;
        return this;
    }
    static checkForError(userLogin) {
        if (!userLogin || !(userLogin instanceof UserLogin))
            return new Error('invalid user login details');
        if (!tools_1.Validity.isValidString(userLogin.ip, 2))
            return new Error('invalid IP address');
        if (!tools_1.Validity.isValidString(userLogin.email, 2))
            return new Error('invalid user email');
        return null;
    }
    static get indexMap() {
        const createIndexName = (postfix) => `index_user_login_${postfix}`;
        const map = new Map();
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
exports.UserLogin = UserLogin;
//# sourceMappingURL=userLogin.js.map