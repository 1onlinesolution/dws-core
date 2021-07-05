/// <reference types="node" />
import * as crypto from 'crypto';
export interface EncryptResult {
    iv: string;
    encrypted: string;
}
export declare class EncryptionService {
    private static Default_IV_Length;
    private static DefaultEncoding;
    private readonly algorithm;
    private readonly key;
    private readonly encryptionKey;
    private readonly encoding;
    private iv_length;
    constructor({ algorithm, encryptionKey, encoding }?: {
        algorithm?: string | undefined;
        encryptionKey?: string | undefined;
        encoding?: crypto.Encoding | undefined;
    });
    createIV(): Promise<Buffer>;
    encrypt(text: string): Promise<EncryptResult | Error>;
    encryptObject<T>(object: T): Promise<EncryptResult | Error>;
    encryptCompact(text: string): Promise<string | Error>;
    encryptObjectCompact<T>(object: T): Promise<string | Error>;
    decrypt(iv: string, encrypted: string): string;
    decryptCompact(text: string): string;
    decryptObjectCompact(encryptedText: string): any;
}
