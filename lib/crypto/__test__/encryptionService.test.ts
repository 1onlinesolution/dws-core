import { EncryptionService, EncryptResult } from '../encryptionService';

const message = 'There you are; I found you';
let encryptionService: EncryptionService;

beforeAll(async () => {
  encryptionService = new EncryptionService({ encryptionKey: 'acc847e68275bd52420d6f657b7fcb735f28a1661040f4ef801356e798749d5a' });
});

describe('EncryptionService', () => {
  test('createIV() creates vector', async () => {
    const vector = await encryptionService.createIV();
    expect(vector && vector.length > 0).toBe(true);
  });

  test('encrypt/decrypt() work', async () => {
    const result = await encryptionService.encrypt(message);
    const { iv, encrypted } = result as EncryptResult;
    // console.log(`ivPart        = ${iv}`);
    // console.log(`encryptedPart = ${encrypted}`);
    const text = await encryptionService.decrypt(iv, encrypted);
    expect(text).toBe(message);
  });

  test('encryptCompact/decryptCompact() work', async () => {
    const secret = await encryptionService.encryptCompact(message);
    const result = await encryptionService.decryptCompact(secret as string);
    expect(result).toBe(message);
  });

  test('encryptObjectCompact(/decryptCompact() work', async () => {
    const data = { item: message };
    const secret = await encryptionService.encryptObjectCompact(data);
    const result = await encryptionService.decryptObjectCompact(secret as string);
    const { item } = result;
    expect(item).toBe(message);
  });

  test('Ctor throws if encryption key not provided', () => {
    expect(() => {
      new EncryptionService({});
    }).toThrowError(/Encryption key is missing/);
  });
});
