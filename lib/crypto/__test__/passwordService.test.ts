import { PasswordService } from '../passwordService';

const password = 'ellada is the best place to live';

let hash = '';

describe('PasswordService', () => {
  // test('checkPassword throws if not provided with a password', () => {
  //   expect(PasswordService.checkPassword('', 'dummy')).rejects.toMatch(/invalid password/);
  // });
  test('checkPassword throws if not provided with a password', async () => {
    await expect(PasswordService.checkPassword('', 'dummy')).rejects.toThrow(/invalid password/);
  });

  test('checkPassword throws if not provided with a hashed password', async () => {
    await expect(PasswordService.checkPassword('dummy', '')).rejects.toThrow(/invalid hashed password/);
  });

  test('generateSalt() generates salt', async () => {
    const salt = await PasswordService.generateSalt();
    expect(salt && salt.length > 0).toBe(true);
  });

  test('hashPassword() successfully creates hashed password', async () => {
    hash = await PasswordService.hashPassword(password);
    expect(hash && hash.length > 0).toBe(true);
  });

  test('checkPassword() confirms password', async () => {
    const result = await PasswordService.checkPassword(password, hash);
    expect(result).toBe(true);
  });

  test('randomBytes() returns bytes', () => {
    const bytes = PasswordService.randomBytes();
    expect(bytes && bytes.length > 0).toBe(true);
  });

  test('randomBytesAsToken() returns bytes', async () => {
    const bytes = await PasswordService.randomBytesAsToken();
    expect(bytes && bytes.length > 0).toBe(true);
  });

  test('randomBytesAsToken() throws if not provided with positive size', () => {
    expect(() => {
      PasswordService.randomBytes(-1);
    }).toThrow(/invalid length/);
  });

  test('hashPassword() throws if not provided with positive size', async () => {
    await expect(PasswordService.hashPassword('')).rejects.toThrow(/invalid password/);
  });
});
