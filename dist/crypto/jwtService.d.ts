/// <reference types="node" />
import * as jwt from 'jsonwebtoken';
export declare class JwtService {
    private readonly algorithm;
    private readonly accessTokenSecretKey;
    private readonly refreshTokenSecretKey;
    private readonly accessTokenExpiresIn;
    private readonly refreshTokenExpiresIn;
    private readonly defaultAccessJwtOptions;
    private readonly defaultRefreshJwtOptions;
    constructor({ algorithm, accessTokenSecretKey, refreshTokenSecretKey, accessTokenExpiresIn, refreshTokenExpiresIn, }: {
        algorithm?: jwt.Algorithm | undefined;
        accessTokenSecretKey?: string | undefined;
        refreshTokenSecretKey?: string | undefined;
        accessTokenExpiresIn?: number | undefined;
        refreshTokenExpiresIn?: number | undefined;
    });
    sign(payload: string | Buffer | object, isAccessToken?: boolean): Promise<string | undefined | Error | null>;
    createAccessToken(payload: string | Buffer | object): Promise<string | undefined | Error | null>;
    createRefreshToken(payload: string | Buffer | object): Promise<string | undefined | Error | null>;
    verifyAccessToken(token: string): Promise<string | Buffer | object | undefined | Error | null>;
    verifyRefreshToken(token: string | undefined): Promise<string | Buffer | object | undefined | Error | null>;
    ensureToken(headers: any): Promise<string | Buffer | object | undefined | Error | null>;
    extractTokenFromHeader(headers: any): string | undefined;
}
