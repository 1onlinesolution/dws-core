import { RegExpUtil } from './regExpUtil';

export class Validity {
  static isArray<T>(obj: T | undefined): boolean {
    return Validity.isDefined(obj) && Array.isArray(obj);
  }

  static isInteger(obj: number): boolean {
    return Number.isInteger(obj);
  }

  static isDefined<T>(obj: T): boolean {
    return obj !== undefined;
  }

  static isBoolean<T>(obj: T): boolean {
    return typeof obj === 'boolean';
  }

  static isObject<T>(obj: T): boolean {
    return typeof obj === 'object';
  }

  static isValidUrl(url: string): boolean {
    return RegExpUtil.url.test(url.toLowerCase());
  }

  static isValidEmail(email: string): boolean {
    if (email === undefined) return false;
    // https://stackoverflow.com/a/46181
    return RegExpUtil.email.test(email.toLowerCase());
  }

  static isValidPassword(password: string): boolean {
    if (password === undefined) return false;
    // https://stackoverflow.com/a/46181
    // eslint-disable-next-line no-useless-escape
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g;
    return regex.test(password);
  }

  static isValidCurrency(text: string, prefix: string | undefined = ''): boolean {
    // eslint-disable-next-line security/detect-unsafe-regex
    const re = /^[$£€] ?(?=\(.*\)|[^()]*$)\(?\d{1,3}(,?\d{3})?(\.\d\d?)?\)?$/;
    if (prefix && prefix !== '') return re.test(text.replace(prefix, ''));
    return re.test(text);
  }

  static isValidDate(date: Date | undefined): boolean {
    return typeof date === 'object' && date instanceof Date;
  }

  static isValidNumber(value: number, min: number = Number.MIN_VALUE, max: number = Number.MAX_VALUE, exclude: number[] = []): boolean {
    if (value === undefined) return false;
    return !((min && +value < min) || (max && +value > max) || (exclude && exclude.length > 0 && exclude.includes(+value)));
  }

  static isValidInteger(
    value: number,
    min: number = Number.MIN_SAFE_INTEGER,
    max: number = Number.MAX_SAFE_INTEGER,
    exclude: number[] = [],
  ): boolean {
    return Validity.isInteger(value) && Validity.isValidNumber(value, min, max, exclude);
  }

  static isValidString(text: string, min = 1, max: number = Number.MAX_SAFE_INTEGER): boolean {
    if (text === undefined) return false;
    // min = 0 -> empty string is allowed
    // min = 1 -> empty string is not allowed
    return !(typeof text === 'undefined' || (min && text.length < min) || (max && text.length > max));
  }

  static isUndefinedOrEmptyString(text: string | undefined): boolean {
    return typeof text === 'undefined' || text === '';
  }
}
