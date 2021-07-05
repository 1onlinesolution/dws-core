"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const DEFAULT_SALT_ROUNDS = 12.5;
class PasswordService {
    static async generateSalt(rounds = DEFAULT_SALT_ROUNDS) {
        if (!rounds) {
            rounds = DEFAULT_SALT_ROUNDS;
        }
        return await bcrypt.genSalt(rounds);
    }
    static async checkPassword(myPlaintextPassword, hashedPassword) {
        // https://www.npmjs.com/package/bcrypt
        if (!myPlaintextPassword || myPlaintextPassword === '')
            return Promise.reject(new Error('invalid password'));
        if (!hashedPassword || hashedPassword === '')
            return Promise.reject(new Error('invalid hashed password'));
        return await bcrypt.compare(myPlaintextPassword, hashedPassword);
    }
    static async hashPassword(password, saltOrRounds) {
        if (!password || password === '')
            return Promise.reject(new Error('invalid password'));
        if (saltOrRounds === undefined)
            saltOrRounds = DEFAULT_SALT_ROUNDS;
        return await bcrypt.hash(password, saltOrRounds);
    }
    static randomBytes(length = 32) {
        if (length <= 0)
            throw new Error('invalid length');
        return crypto.randomBytes(length);
    }
    static randomBytesAsToken(length = 32, encoding = 'hex') {
        const buffer = PasswordService.randomBytes(length);
        if (!buffer)
            throw new Error('cannot generate token buffer');
        return buffer.toString(encoding);
    }
}
exports.PasswordService = PasswordService;
//# sourceMappingURL=passwordService.js.map