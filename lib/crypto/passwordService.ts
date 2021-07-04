import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const DEFAULT_SALT_ROUNDS = 12.5;

export class PasswordService {
  static async generateSalt(rounds: number = DEFAULT_SALT_ROUNDS): Promise<string> {
    if (!rounds) {
      rounds = DEFAULT_SALT_ROUNDS;
    }

    return await bcrypt.genSalt(rounds);
  }

  static async checkPassword(myPlaintextPassword: string, hashedPassword: string): Promise<boolean> {
    // https://www.npmjs.com/package/bcrypt
    if (!myPlaintextPassword) return Promise.reject(new Error('invalid password'));
    if (!hashedPassword) return Promise.reject(new Error('invalid hashed password'));

    return await bcrypt.compare(myPlaintextPassword, hashedPassword);
  }

  static async hashPassword(password: string | Buffer, saltOrRounds: string | number): Promise<string> {
    if (!password) return Promise.reject(new Error('invalid password'));
    if (saltOrRounds === undefined) saltOrRounds = DEFAULT_SALT_ROUNDS;
    return await bcrypt.hash(password, saltOrRounds);
  }

  static randomBytes(length = 32): Buffer {
    if (length <= 0) throw new Error('invalid length');
    return crypto.randomBytes(length);
  }

  static randomBytesAsToken(length = 32, encoding: BufferEncoding = 'hex'): string {
    const buffer = this.randomBytes(length);
    if(!buffer) throw new Error('cannot generate token buffer');
    return buffer.toString(encoding);
  }

}
