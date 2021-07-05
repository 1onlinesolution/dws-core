"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const mongodb_1 = require("mongodb");
const tools_1 = require("../tools");
const userStatistics_1 = require("./userStatistics");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Customer"] = 0] = "Customer";
    UserRole[UserRole["Employee"] = 1] = "Employee";
    UserRole[UserRole["Manager"] = 2] = "Manager";
    UserRole[UserRole["SuperUser"] = 3] = "SuperUser";
    UserRole[UserRole["Admin"] = 4] = "Admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User {
    constructor({ _id = new mongodb_1.ObjectId(), first_name = '', last_name = '', user_name = '', email = '', password = '', company_name = '', license = '', roles = [UserRole.Customer], verified = false, verification_token = '', newsletter = true, stats = new userStatistics_1.UserStatistics(), api_client_id = new mongodb_1.ObjectId(), api_client_secret = '', jwt_access_token = '', jwt_refresh_token = '', } = {}) {
        this._password = '';
        this._id = new mongodb_1.ObjectId();
        this.first_name = '';
        this.last_name = '';
        this.user_name = '';
        this.email = '';
        this.company_name = '';
        this.license = '';
        this.roles = [UserRole.Customer];
        this.verified = false;
        this.verification_token = '';
        this.newsletter = true;
        this.stats = new userStatistics_1.UserStatistics();
        this.api_client_id = new mongodb_1.ObjectId();
        this.api_client_secret = '';
        this.jwt_access_token = '';
        this.jwt_refresh_token = '';
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this.modified_at = this.created_at;
        this._id = _id;
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
        let ignorePassword = true;
        if (password !== undefined) {
            ignorePassword = false;
            this._password = password;
        }
        const error = User.checkForError(this, ignorePassword);
        if (error)
            throw error;
        return this;
    }
    static get indexMap() {
        const createIndexName = (postfix) => `index_user_${postfix}`;
        const map = new Map();
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
    static checkForError(user, ignorePassword = false) {
        if (!user || !(user instanceof User))
            return new Error('invalid user details');
        if (!tools_1.Validity.isValidString(user.first_name, 2))
            return new Error('invalid first name');
        if (!tools_1.Validity.isValidString(user.last_name, 2))
            return new Error('invalid last name');
        if (!tools_1.Validity.isValidEmail(user.email))
            return new Error('invalid email');
        if (!tools_1.Validity.isValidString(user.user_name, 6))
            return new Error('invalid user name');
        if (!ignorePassword && !tools_1.Validity.isValidPassword(user.password))
            return new Error('invalid password');
        return null;
    }
    get fullName() {
        return `${this.first_name}, ${this.last_name}`;
    }
    get idAsString() {
        return `${this._id.toHexString()}`;
    }
    get password() {
        return this._password;
    }
    get getPayloadForToken() {
        return {
            _id: this._id,
            first_name: this.first_name,
            api_client_id: this.api_client_id,
        };
    }
    get isApiClient() {
        return tools_1.Validity.isValidString(this.api_client_id.toHexString(), 2) && tools_1.Validity.isValidString(this.api_client_secret, 2);
    }
    get isCustomer() {
        return this.roles.includes(UserRole.Customer);
    }
    get isEmployee() {
        return this.roles.includes(UserRole.Employee);
    }
    get isManager() {
        return this.roles.includes(UserRole.Manager);
    }
    get isSuperUser() {
        return this.roles.includes(UserRole.SuperUser);
    }
    get isAdmin() {
        return this.roles.includes(UserRole.Admin);
    }
    get requiresVerification() {
        return !(this.verified && !this.verification_token);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map