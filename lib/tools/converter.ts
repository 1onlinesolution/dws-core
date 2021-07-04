import format from './ms';

export class Converter {
  static toBoolean = (value: boolean | string | undefined, ifUndefinedSetToFalse = true): boolean => {
    // Javascript way
    // if (typeof value === 'undefined') return !ifUndefinedSetToFalse;
    // return Boolean(value); // (or !!value)
    const result = value ?? !ifUndefinedSetToFalse;
    return Boolean(result);
  };

  static ms = (value: string | number, options: { long: boolean } = { long: false }): string | number => format(value, options);

  static toSeconds = (value: string | number, options: { long: boolean } = { long: false }): string | number => format(value, options);

  static checkBoxToBoolean = (value: string | undefined, valueExpected: string): boolean => {
    if (typeof value === 'undefined') {
      return false;
    }

    const textLowerCase = valueExpected.toLowerCase();
    return value.toLowerCase() === textLowerCase;
  };
}
