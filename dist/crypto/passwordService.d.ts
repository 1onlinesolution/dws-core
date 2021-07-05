/// <reference types="node" />
export declare class PasswordService {
    static generateSalt(rounds?: number): Promise<string>;
    static checkPassword(myPlaintextPassword: string, hashedPassword: string): Promise<boolean>;
    static hashPassword(password: string | Buffer, saltOrRounds?: string | number): Promise<string>;
    static randomBytes(length?: number): Buffer;
    static randomBytesAsToken(length?: number, encoding?: BufferEncoding): string;
}
