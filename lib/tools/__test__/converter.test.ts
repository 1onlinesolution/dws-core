import { Converter } from '../converter';

describe('Basic checks', () => {
  test('Converts falsy values to false', () => {
    // Falsy Values
    // false
    // undefined
    // null
    // NaN
    // 0
    // '' (empty string)
    expect(Converter.toBoolean(false)).toBe(false);
    expect(Converter.toBoolean(undefined)).toBe(false);
    expect(Converter.toBoolean(null)).toBe(false);
    expect(Converter.toBoolean(NaN)).toBe(false);
    expect(Converter.toBoolean(0)).toBe(false);
    expect(Converter.toBoolean('')).toBe(false);
  });

  test('Converts boolean to true', () => {
    expect(Converter.toBoolean(true)).toBe(true);
  });

  test('Converts boolean to false', () => {
    expect(Converter.toBoolean(false)).toBe(false);
    expect(Converter.toBoolean([])).toBe(false);
    expect(Converter.toBoolean(undefined)).toBe(false);
    expect(Converter.toBoolean('Truee')).toBe(false);
    expect(Converter.toBoolean('Tru')).toBe(false);
    expect(Converter.toBoolean('FalSe')).toBe(false);
  });

  test('Converts string to true', () => {
    expect(Converter.toBoolean('True')).toBe(true);
  });
});

describe('Converter.ms', () => {
  test('Converts successfully from string', () => {
    expect(Converter.ms('2 days')).toBe(172800000);
    expect(Converter.ms('1d')).toBe(86400000);
    expect(Converter.ms('10h')).toBe(36000000);
    expect(Converter.ms('2.5 hrs')).toBe(9000000);
    expect(Converter.ms('2h')).toBe(7200000);

    expect(Converter.ms('1m')).toBe(60000);
    expect(Converter.ms('1minutes')).toBe(60000);
    expect(Converter.ms('1minute')).toBe(60000);
    expect(Converter.ms('1mins')).toBe(60000);
    expect(Converter.ms('1min')).toBe(60000);

    expect(Converter.ms('5s')).toBe(5000);
    expect(Converter.ms('5seconds')).toBe(5000);
    expect(Converter.ms('5second')).toBe(5000);
    expect(Converter.ms('5secs')).toBe(5000);
    expect(Converter.ms('5sec')).toBe(5000);

    expect(Converter.ms('5ms')).toBe(5);
    expect(Converter.ms('5milliseconds')).toBe(5);
    expect(Converter.ms('5millisecond')).toBe(5);
    expect(Converter.ms('5msecs')).toBe(5);
    expect(Converter.ms('5msec')).toBe(5);

    expect(Converter.ms('1y')).toBe(31557600000);
    expect(Converter.ms('1year')).toBe(31557600000);
    expect(Converter.ms('1yr')).toBe(31557600000);
    expect(Converter.ms('1 years')).toBe(31557600000);
    expect(Converter.ms('1 yrs')).toBe(31557600000);
    expect(Converter.ms('100')).toBe(100);
    expect(Converter.ms('-3 days')).toBe(-259200000);
    expect(Converter.ms('-1h')).toBe(-3600000);
    expect(Converter.ms('-200')).toBe(-200);

    expect(Converter.ms('3 weeks') > 0);
    expect(Converter.ms('1 week') > 0);
    expect(Converter.ms('3 w') > 0);
  });

  test('Converts successfully from number', () => {
    expect(Converter.ms(60000)).toBe('1m');
    expect(Converter.ms(2 * 60000)).toBe('2m');
    expect(Converter.ms(-3 * 60000)).toBe('-3m');
    expect(Converter.ms(Converter.ms('10 hours'))).toBe('10h');

    expect(Converter.ms(60000, { long: true })).toBe('1 minute');
    expect(Converter.ms(2 * 60000, { long: true })).toBe('2 minutes');
    expect(Converter.ms(-3 * 60000, { long: true })).toBe('-3 minutes');
    expect(Converter.ms(Converter.ms('10 hours'), { long: true })).toBe('10 hours');

    expect(Converter.ms(Converter.ms('10 days'), { long: true })).toBe('10 days');
    expect(Converter.ms(Converter.ms('10 days'), { long: false })).toBe('10d');

    expect(Converter.ms(Converter.ms('10 milliseconds'), { long: true })).toBe('10 ms');
    expect(Converter.ms(Converter.ms('10 milliseconds'), { long: false })).toBe('10ms');

    expect(Converter.ms(Converter.ms('10 seconds'), { long: true })).toBe('10 seconds');
    expect(Converter.ms(Converter.ms('10 seconds'), { long: false })).toBe('10s');
  });
});

describe('Converter.toSeconds', () => {
  test('Converts successfully from string', () => {
    expect(Converter.toSeconds('2 days')).toBe(172800);
    expect(Converter.toSeconds('1d')).toBe(86400);
    expect(Converter.toSeconds('10h')).toBe(36000);
    expect(Converter.toSeconds('2.5 hrs')).toBe(9000);
    expect(Converter.toSeconds('2h')).toBe(7200);
    expect(Converter.toSeconds('1m')).toBe(60);
    expect(Converter.toSeconds('5s')).toBe(5);
    expect(Converter.toSeconds('1y')).toBe(31557600);
    expect(Converter.toSeconds('100')).toBe(0.1);
    expect(Converter.toSeconds('-3 days')).toBe(-259200);
    expect(Converter.toSeconds('-1h')).toBe(-3600);
    expect(Converter.toSeconds('-200')).toBe(-0.2);
  });
});

describe('Converter.ms throws', () => {
  test('Ctor throws if object provided', () => {
    expect(() => {
      Converter.ms('123 hello world');
    }).toThrowError(/Invalid time format/);
  });

  test('Ctor throws if string length is greater than 100', () => {
    expect(() => {
      Converter.ms('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890');
    }).toThrowError(/String length should be up to 100 characters/);
  });
});

describe('Converter.checkBoxToBoolean', () => {
  test('Converts to true', () => {
    expect(Converter.checkBoxToBoolean('lalala', 'lalala')).toBe(true);
  });

  test('Converts to false', () => {
    expect(Converter.checkBoxToBoolean(undefined, 'lalala')).toBe(false);
  });
});
