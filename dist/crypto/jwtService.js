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
exports.JwtService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
class JwtService {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor({ algorithm = 'HS512', accessTokenSecretKey = '', refreshTokenSecretKey = '', accessTokenExpiresIn = 0, refreshTokenExpiresIn = 0, }) {
        this.algorithm = algorithm;
        this.accessTokenSecretKey = accessTokenSecretKey;
        this.refreshTokenSecretKey = refreshTokenSecretKey;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
        this.defaultAccessJwtOptions = {
            algorithm: algorithm,
            expiresIn: accessTokenExpiresIn,
        };
        this.defaultRefreshJwtOptions = {
            algorithm: algorithm,
            expiresIn: refreshTokenExpiresIn,
        };
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    sign(payload, isAccessToken = true) {
        const options = isAccessToken ? this.defaultAccessJwtOptions : this.defaultRefreshJwtOptions;
        const secret = isAccessToken ? this.accessTokenSecretKey : this.refreshTokenSecretKey;
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    // For any error detected
                    reject(err);
                }
                else {
                    // When task is finished
                    resolve(token);
                }
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    createAccessToken(payload) {
        return this.sign(payload, true);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    createRefreshToken(payload) {
        return this.sign(payload, false);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    verifyAccessToken(token) {
        const secret = this.accessTokenSecretKey;
        const options = this.defaultAccessJwtOptions;
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, options, (err, payload) => {
                if (err) {
                    // For any error detected
                    return reject(err);
                }
                // When task is finished
                return resolve(payload);
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    verifyRefreshToken(token) {
        const secret = this.refreshTokenSecretKey;
        const options = this.defaultRefreshJwtOptions;
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, options, (err, payload) => {
                if (err) {
                    // For any error detected
                    return reject(err);
                }
                // When task is finished
                return resolve(payload);
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    ensureToken(headers) {
        // eslint-disable-line @typescript-eslint/ban-types
        const token = this.extractTokenFromHeader(headers);
        if (token === undefined)
            return Promise.reject(new Error('invalid token'));
        try {
            // returns the payload
            return this.verifyAccessToken(token);
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    extractTokenFromHeader(headers) {
        const bearerHeader = headers.authorization;
        if (!bearerHeader)
            return undefined;
        return bearerHeader.split(' ')[1];
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwtService.js.map