import { DateTimeUtils } from '../dateTimeUtils';

describe('DateTimeUtils.dateToUTC', () => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate
  const date1 = 'December 31, 1975, 23:15:30 GMT+11:00';
  const date2 = 'December 31, 1975, 23:15:30 GMT-11:00';

  let dateUTC1: Date, dateUTC2: Date;

  beforeAll(() => {
    // runs before all tests in this block
    dateUTC1 = DateTimeUtils.dateToUTC(DateTimeUtils.parse(date1));
    dateUTC2 = DateTimeUtils.dateToUTC(DateTimeUtils.parse(date2));
  });

  test('returns correct year', () => {
    // Falsy Values
    // false
    // undefined
    // null
    // NaN
    // 0
    // '' (empty string)
    expect(dateUTC1.getFullYear()).toBe(1975);
    expect(dateUTC2.getFullYear()).toBe(1976);
  });

  test('returns correct date', () => {
    expect(dateUTC1.getDate()).toBe(31);
    expect(dateUTC2.getDate()).toBe(1);
  });

  test('returns correct hours', () => {
    expect(dateUTC1.getHours()).toBe(12);
    expect(dateUTC2.getHours()).toBe(10);
  });

  test('returns correct minutes', () => {
    expect(dateUTC1.getMinutes()).toBe(15);
    expect(dateUTC2.getMinutes()).toBe(15);
  });

  test('returns correct seconds', () => {
    expect(dateUTC1.getSeconds()).toBe(30);
    expect(dateUTC2.getSeconds()).toBe(30);
  });
});


describe('DateTimeUtils.displayTimeFromNow', () => {

  test('returns correct history', () => {
    const dateUTC: Date = DateTimeUtils.currentUtcDate();
    dateUTC.setMinutes(dateUTC.getMinutes() - 30);
    expect(DateTimeUtils.displayTimeFromNow(dateUTC)).toBe('30 minutes ago');
  });
});