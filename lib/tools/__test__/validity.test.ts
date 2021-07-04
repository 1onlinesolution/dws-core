import { DateTimeUtils } from '../dateTimeUtils';
import { Validity } from '../validity';

describe('Validity', () => {
  test('isArray', () => {
    expect(Validity.isArray([])).toBe(true);
    expect(Validity.isArray('')).toBe(false);
    expect(Validity.isArray(undefined)).toBe(false);
    expect(Validity.isArray({ a: 1 })).toBe(false);
  });

  test('isInteger', () => {
    expect(Validity.isInteger(1235)).toBe(true);
    expect(Validity.isInteger(1.235)).toBe(false);
    expect(Validity.isInteger(NaN)).toBe(false);
  });

  test('isDefined', () => {
    expect(Validity.isDefined(1235)).toBe(true);
    expect(Validity.isDefined(1.235)).toBe(true);
    expect(Validity.isDefined(NaN)).toBe(true);
    expect(Validity.isDefined(undefined)).toBe(false);
    expect(Validity.isDefined([])).toBe(true);
    expect(Validity.isDefined('')).toBe(true);
  });

  test('isBoolean', () => {
    expect(Validity.isBoolean(1235)).toBe(false);
    expect(Validity.isBoolean(1.235)).toBe(false);
    expect(Validity.isBoolean(NaN)).toBe(false);
    expect(Validity.isBoolean(undefined)).toBe(false);
    expect(Validity.isBoolean([])).toBe(false);
    expect(Validity.isBoolean('')).toBe(false);
    expect(Validity.isBoolean(true)).toBe(true);
    expect(Validity.isBoolean(false)).toBe(true);
    expect(Validity.isBoolean('true')).toBe(false);
    expect(Validity.isBoolean('1')).toBe(false);
    expect(Validity.isBoolean('on')).toBe(false);
  });

  test('isObject', () => {
    expect(Validity.isObject(1235)).toBe(false);
    expect(Validity.isObject(NaN)).toBe(false);
    expect(Validity.isObject(undefined)).toBe(false);
    expect(Validity.isObject('')).toBe(false);
    expect(Validity.isObject(true)).toBe(false);
    expect(Validity.isObject({ a: 1 })).toBe(true);
    expect(Validity.isObject([])).toBe(true);
  });

  test('isValidUrl', () => {
    expect(Validity.isValidUrl('')).toBe(false);
    expect(Validity.isValidUrl('ade')).toBe(false);
    expect(Validity.isValidUrl('/api/')).toBe(false);
    expect(Validity.isValidUrl('http://www')).toBe(false);
    expect(Validity.isValidUrl('https://api.com/')).toBe(true);
    expect(Validity.isValidUrl('https://api.com')).toBe(true);
    expect(Validity.isValidUrl('https:://api.com/')).toBe(false);
    expect(Validity.isValidUrl('https:://api.com')).toBe(false);
  });

  test('isValidEmail', () => {
    expect(Validity.isValidEmail('')).toBe(false);
    expect(Validity.isValidEmail('.')).toBe(false);
    expect(Validity.isValidEmail('plainaddress')).toBe(false);
    expect(Validity.isValidEmail('#@%^%#$@#$@#.com')).toBe(false);
    expect(Validity.isValidEmail('http://www')).toBe(false);
    expect(Validity.isValidEmail('https://api.com/')).toBe(false);
    expect(Validity.isValidEmail('https://api.com')).toBe(false);
    expect(Validity.isValidEmail('https:://api.com/')).toBe(false);
    expect(Validity.isValidEmail('https:://api.com')).toBe(false);
    expect(Validity.isValidEmail('a.f')).toBe(false);
    expect(Validity.isValidEmail('a@f')).toBe(false);
    expect(Validity.isValidEmail('a@f.')).toBe(false);
    expect(Validity.isValidEmail('a@f.r')).toBe(true);
    expect(Validity.isValidEmail('a@f.us')).toBe(true);
    expect(Validity.isValidEmail('a@f.us')).toBe(true);
    expect(Validity.isValidEmail('@example.com')).toBe(false);
    expect(Validity.isValidEmail('email.example.com')).toBe(false);
    expect(Validity.isValidEmail('email@example@example.com')).toBe(false);
    expect(Validity.isValidEmail('email.@example.com')).toBe(false);
    expect(Validity.isValidEmail('email..email@example.com')).toBe(false);
    expect(Validity.isValidEmail('email@example.com (Joe Smith)')).toBe(false);
    expect(Validity.isValidEmail('Joe Smith <email@example.com>')).toBe(false);
    expect(Validity.isValidEmail('email@example.com')).toBe(true);
    expect(Validity.isValidEmail('firstname.lastname@example.com')).toBe(true);
    expect(Validity.isValidEmail('email@subdomain.example.com')).toBe(true);
    expect(Validity.isValidEmail('firstname+lastname@example.com')).toBe(true);
    expect(Validity.isValidEmail('email@123.123.123.123')).toBe(false);
    expect(Validity.isValidEmail('email@[123.123.123.123]')).toBe(false);
    expect(Validity.isValidEmail('email@111.222.333.44444')).toBe(false);
    expect(Validity.isValidEmail('email@example')).toBe(false);
    expect(Validity.isValidEmail('email@-example.com')).toBe(false);
    expect(Validity.isValidEmail('Abc..123@example.com')).toBe(false);
    expect(Validity.isValidEmail('"email"@example.com')).toBe(true);
    expect(Validity.isValidEmail('1234567890@example.com')).toBe(true);
    expect(Validity.isValidEmail('email@example-one.com')).toBe(true);
    expect(Validity.isValidEmail('_______@example.com')).toBe(true);
    expect(Validity.isValidEmail('email@example.name')).toBe(true);
    expect(Validity.isValidEmail('email@example.museum')).toBe(true);
    expect(Validity.isValidEmail('email@example.co.jp')).toBe(true);
    expect(Validity.isValidEmail('firstname-lastname@example.com')).toBe(true);
  });

  test('isValidPassword', () => {
    expect(Validity.isValidPassword('')).toBe(false);
    expect(Validity.isValidPassword('ade')).toBe(false);
    expect(Validity.isValidPassword('/api/')).toBe(false);
    expect(Validity.isValidPassword('http://www')).toBe(false);
    expect(Validity.isValidPassword('https://api.com/')).toBe(false);
    expect(Validity.isValidPassword('https://api.com')).toBe(false);
    expect(Validity.isValidPassword('https:://api.com/')).toBe(false);
    expect(Validity.isValidPassword('https:://api.com')).toBe(false);
    expect(Validity.isValidPassword('a')).toBe(false);
    expect(Validity.isValidPassword('ab')).toBe(false);
    expect(Validity.isValidPassword('abc')).toBe(false);
    expect(Validity.isValidPassword('abcd')).toBe(false);
    expect(Validity.isValidPassword('abcde')).toBe(false);
    expect(Validity.isValidPassword('abcdef')).toBe(false);
    expect(Validity.isValidPassword('abcdefg')).toBe(false);
    expect(Validity.isValidPassword('password')).toBe(true);
    expect(Validity.isValidPassword('p@sswor%$&d')).toBe(true);
  });

  test('isValidCurrency', () => {
    expect(Validity.isValidCurrency('')).toBe(false);
    expect(Validity.isValidCurrency('text')).toBe(false);
    expect(Validity.isValidCurrency('%2.1')).toBe(false);
    expect(Validity.isValidCurrency('#2.1')).toBe(false);
    expect(Validity.isValidCurrency('@2.1')).toBe(false);
    expect(Validity.isValidCurrency('% 2.1')).toBe(false);
    expect(Validity.isValidCurrency('# 2.1')).toBe(false);
    expect(Validity.isValidCurrency('@ 2.1')).toBe(false);
    expect(Validity.isValidCurrency('$2.1')).toBe(true);
    expect(Validity.isValidCurrency('$ 2.1')).toBe(true);
    expect(Validity.isValidCurrency('$  2.1')).toBe(false);
    expect(Validity.isValidCurrency('£2.1')).toBe(true);
    expect(Validity.isValidCurrency('£ 2.1')).toBe(true);
    expect(Validity.isValidCurrency('£  2.1')).toBe(false);
    expect(Validity.isValidCurrency('€2.1')).toBe(true);
    expect(Validity.isValidCurrency('€ 2.1')).toBe(true);
    expect(Validity.isValidCurrency('€  2.1')).toBe(false);
  });

  test('isValidDate', () => {
    expect(Validity.isValidDate(undefined)).toBe(false);
    expect(Validity.isValidDate(DateTimeUtils.currentUtcDate())).toBe(true);
    expect(Validity.isValidDate(new Date())).toBe(true);
  });

  test('isValidNumber', () => {
    expect(Validity.isValidNumber(1, 3, 4)).toBe(false);
    expect(Validity.isValidNumber(1, 1, 4)).toBe(true);
    expect(Validity.isValidNumber(1, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidNumber(2, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidNumber(3, 1, 4, [1,2])).toBe(true);
    expect(Validity.isValidNumber(4, 1, 4, [1,2])).toBe(true);
  });

  test('isValidInteger', () => {
    expect(Validity.isValidInteger(1.234, 3, 4)).toBe(false);
    expect(Validity.isValidInteger(1.234, 1, 4)).toBe(false);
    expect(Validity.isValidInteger(1.234, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidInteger(2.234, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidInteger(3.234, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidInteger(3.994, 1, 4, [1,2])).toBe(false);

    expect(Validity.isValidInteger(1, 3, 4)).toBe(false);
    expect(Validity.isValidInteger(1, 1, 4)).toBe(true);
    expect(Validity.isValidInteger(1, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidInteger(2, 1, 4, [1,2])).toBe(false);
    expect(Validity.isValidInteger(3, 1, 4, [1,2])).toBe(true);
    expect(Validity.isValidInteger(4, 1, 4, [1,2])).toBe(true);
  });

  test('isValidString', () => {
    expect(Validity.isValidString('')).toBe(false);
    expect(Validity.isValidString('text', 5)).toBe(false);
    expect(Validity.isValidString('text', 1, 3)).toBe(false);
  });

  test('isUndefinedOrEmptyString', () => {
    expect(Validity.isUndefinedOrEmptyString(undefined)).toBe(true);
    expect(Validity.isUndefinedOrEmptyString('')).toBe(true);
    expect(Validity.isUndefinedOrEmptyString('.')).toBe(false);
    expect(Validity.isUndefinedOrEmptyString('text')).toBe(false);
  });
});
