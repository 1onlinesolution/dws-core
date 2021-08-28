import * as jwt from 'jsonwebtoken';

export class JwtService {
  private readonly algorithm: jwt.Algorithm;
  private readonly accessTokenSecretKey: jwt.Secret;
  private readonly refreshTokenSecretKey: jwt.Secret;
  private readonly accessTokenExpiresIn: number | string;
  private readonly refreshTokenExpiresIn: number | string;
  private readonly defaultAccessJwtOptions: jwt.SignOptions;
  private readonly defaultRefreshJwtOptions: jwt.SignOptions;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor({
    algorithm = 'HS512' as jwt.Algorithm,
    accessTokenSecretKey = '',
    refreshTokenSecretKey = '',
    accessTokenExpiresIn = 0,
    refreshTokenExpiresIn = 0,
  }) {
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
  sign(payload: string | Buffer | object, isAccessToken = true): Promise<string | undefined | Error | null> {
    const options = isAccessToken ? this.defaultAccessJwtOptions : this.defaultRefreshJwtOptions;
    const secret = isAccessToken ? this.accessTokenSecretKey : this.refreshTokenSecretKey;

    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err: Error | null, token: string | undefined) => {
        if (err) {
          // For any error detected
          reject(err);
        } else {
          // When task is finished
          resolve(token);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  createAccessToken(payload: string | Buffer | object): Promise<string | undefined | Error | null> {
    return this.sign(payload, true);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  createRefreshToken(payload: string | Buffer | object): Promise<string | undefined | Error | null> {
    return this.sign(payload, false);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  verifyAccessToken(token: string): Promise<string | Buffer | object | undefined | Error | null> {
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
  verifyRefreshToken(token: string): Promise<string | Buffer | object | undefined | Error | null> {
    const secret = this.refreshTokenSecretKey;
    const options = this.defaultRefreshJwtOptions;
    return new Promise((resolve, reject) => {
      jwt.verify(token as string, secret, options, (err, payload) => {
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
  ensureToken(headers: any): Promise<string | Buffer | object | undefined | Error | null> {
    // eslint-disable-line @typescript-eslint/ban-types
    const token = this.extractTokenFromHeader(headers);
    if (token === undefined) return Promise.reject(new Error('invalid token'));

    try {
      // returns the payload
      return this.verifyAccessToken(token);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  extractTokenFromHeader(headers: any): string | undefined {
    const bearerHeader = headers.authorization;
    if (!bearerHeader) return undefined;
    return bearerHeader.split(' ')[1];
  }
}
