import format from './ms';

export class Converter {
  static toBoolean<T>(value: T, ifUndefinedSetToFalse = true): boolean {
    // Javascript way
    // if (typeof value === 'undefined') return !ifUndefinedSetToFalse;
    // return Boolean(value); // (or !!value)
    if (typeof value === 'boolean') {
      return value;
    } else if (typeof value === 'undefined') {
      return !ifUndefinedSetToFalse;
    } else if (typeof value === 'string') {
      const trueValues = ['true', '1', 'on',];
      return trueValues.includes(value.toLowerCase());
    }  else if (typeof value === 'number') {
      return !isNaN(value) && value !== 0;
    }

    return false;
  }

  static ms = (value: string | number, options: { long: boolean } = { long: false }): string | number => format(value, options);

  static toSeconds = (value: string | number, options: { long: boolean } = { long: false }): string | number => {
    if (typeof value === 'string') return format(value, options) as number / 1000;
    return format(value, options);
  };

  static checkBoxToBoolean = (value: string | undefined, valueExpected: string): boolean => {
    if (typeof value === 'undefined') {
      return false;
    }

    const textLowerCase = valueExpected.toLowerCase();
    return value.toLowerCase() === textLowerCase;
  };
}
