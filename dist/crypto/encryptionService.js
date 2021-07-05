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
exports.EncryptionService = void 0;
const crypto = __importStar(require("crypto"));
const passwordService_1 = require("./passwordService");
// https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options
// https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_createdecipheriv_algorithm_key_iv_options
class EncryptionService {
    constructor({ algorithm = 'aes-256-cbc', encryptionKey = '', encoding = EncryptionService.DefaultEncoding } = {}) {
        // Initialization vectors should be unpredictable and unique; ideally, they will be cryptographically random.
        // They do not have to be secret: IVs are typically just added to ciphertext messages unencrypted.
        // It may sound contradictory that something has to be unpredictable and unique, but does not have to be secret;
        // it is important to remember that an attacker must not be able to predict ahead of time what a given IV will be.
        this.iv_length = EncryptionService.Default_IV_Length;
        this.algorithm = algorithm;
        //
        // The key is the raw key used by the algorithm and iv is an initialization vector.
        // Both arguments must be 'utf8' encoded strings, Buffers, TypedArray, or DataViews.
        // If the cipher does not need an initialization vector, iv may be null.
        //
        // Example key: 6b42ea8281fb0056b868e1614a1dfe58c47d74536e979af8b193828050db5d31
        //
        if (!encryptionKey) {
            throw new Error('Encryption key is missing');
        }
        this.encryptionKey = encryptionKey;
        this.encoding = encoding;
        this.key = Buffer.from(encryptionKey, this.encoding);
        return this;
    }
    async createIV() {
        // https://stackoverflow.com/a/49021891
        // All IVs/nonces should be generated randomly. Always.
        // The important thing to keep in mind here is that an IV is not a secret.
        // You can pass it publicly.
        return passwordService_1.PasswordService.randomBytes(this.iv_length);
    }
    async encrypt(text) {
        try {
            const iv = await this.createIV();
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv, undefined);
            // input_encoding:  'utf8' | 'ascii' | 'binary'
            // output_encoding: 'binary' | 'base64' | 'hex'
            let encrypted = cipher.update(text, 'utf8', this.encoding);
            encrypted += cipher.final(this.encoding);
            return {
                iv: iv.toString(this.encoding),
                encrypted: encrypted.toString(),
            };
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async encryptObject(object) {
        try {
            return await this.encrypt(JSON.stringify(object));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async encryptCompact(text) {
        try {
            const result = (await this.encrypt(text));
            return `${result.iv}:${result.encrypted}`;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async encryptObjectCompact(object) {
        try {
            const result = (await this.encryptObject(object));
            return `${result.iv}:${result.encrypted}`;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    decrypt(iv, encrypted) {
        const ivBuffer = Buffer.from(iv, this.encoding);
        const encryptedText = Buffer.from(encrypted, this.encoding);
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, ivBuffer);
        // let decrypted = decipher.update(encryptedText.toString(), encoding);
        // decrypted += decipher.final();
        return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
    }
    decryptCompact(text) {
        const textParts = text.split(':');
        return this.decrypt(textParts.shift(), textParts[0]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decryptObjectCompact(encryptedText) {
        const decrypted = this.decryptCompact(encryptedText);
        return JSON.parse(decrypted);
    }
}
exports.EncryptionService = EncryptionService;
// Initialization vectors should be unpredictable and unique; ideally, they will be cryptographically random.
// They do not have to be secret: IVs are typically just added to ciphertext messages unencrypted.
// It may sound contradictory that something has to be unpredictable and unique, but does not have to be secret;
// it is important to remember that an attacker must not be able to predict ahead of time what a given IV will be.
EncryptionService.Default_IV_Length = 16; // For AES, this is always 16
EncryptionService.DefaultEncoding = 'hex';
//# sourceMappingURL=encryptionService.js.map