import * as crypto from 'crypto';
import { PasswordService } from './passwordService';

export interface EncryptResult {
  iv: string;
  encrypted: string;
}

// https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options
// https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_createdecipheriv_algorithm_key_iv_options

export class EncryptionService {
  // Initialization vectors should be unpredictable and unique; ideally, they will be cryptographically random.
  // They do not have to be secret: IVs are typically just added to ciphertext messages unencrypted.
  // It may sound contradictory that something has to be unpredictable and unique, but does not have to be secret;
  // it is important to remember that an attacker must not be able to predict ahead of time what a given IV will be.
  private static Default_IV_Length = 16; // For AES, this is always 16

  private static DefaultEncoding: crypto.Encoding = 'hex';

  private readonly algorithm: string;
  private readonly key: Buffer;
  private readonly encryptionKey: string;
  private readonly encoding: crypto.Encoding;

  // Initialization vectors should be unpredictable and unique; ideally, they will be cryptographically random.
  // They do not have to be secret: IVs are typically just added to ciphertext messages unencrypted.
  // It may sound contradictory that something has to be unpredictable and unique, but does not have to be secret;
  // it is important to remember that an attacker must not be able to predict ahead of time what a given IV will be.
  private iv_length = EncryptionService.Default_IV_Length;

  constructor({ algorithm = 'aes-256-cbc', encryptionKey = '', encoding = EncryptionService.DefaultEncoding } = {}) {
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

  async createIV(): Promise<Buffer> {
    // https://stackoverflow.com/a/49021891
    // All IVs/nonces should be generated randomly. Always.
    // The important thing to keep in mind here is that an IV is not a secret.
    // You can pass it publicly.
    return PasswordService.randomBytes(this.iv_length);
  }

  async encrypt(text: string): Promise<EncryptResult> {
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
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async encryptObject<T>(object: T): Promise<EncryptResult | Error> {
    try {
      return await this.encrypt(JSON.stringify(object));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async encryptCompact(text: string): Promise<string> {
    try {
      const result = (await this.encrypt(text)) as EncryptResult;
      return `${result.iv}:${result.encrypted}`;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async encryptObjectCompact<T>(object: T): Promise<string> {
    try {
      const result = (await this.encryptObject(object)) as EncryptResult;
      return `${result.iv}:${result.encrypted}`;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  decrypt(iv: string, encrypted: string): string {
    const ivBuffer = Buffer.from(iv, this.encoding);
    const encryptedText = Buffer.from(encrypted, this.encoding);
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, ivBuffer);
    // let decrypted = decipher.update(encryptedText.toString(), encoding);
    // decrypted += decipher.final();
    return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
  }

  decryptCompact(text: string): string {
    const textParts = text.split(':');
    return this.decrypt(textParts.shift() as string, textParts[0]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decryptObjectCompact(encryptedText: string): any {
    const decrypted = this.decryptCompact(encryptedText);
    return JSON.parse(decrypted);
  }
}
