import moment from 'moment';
import { Validity } from './validity';

// https://stackoverflow.com/a/6777470
// https://stackoverflow.com/a/14523953

export class DateTimeUtils {
  static parse(dateAsString: string): Date {
    if (!Validity.isValidString(dateAsString)) throw new Error('invalid date');
    return new Date(Date.parse(dateAsString));
  }

  static dateToUTC(date: Date): Date {
    if (!Validity.isValidDate(date)) throw new Error('invalid date');
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  }

  static currentUtcDate(): Date {
    const date = new Date();
    return DateTimeUtils.dateToUTC(date);
  }

  static displayTimeFromNow(date: Date): string {
    if (!Validity.isValidDate(date)) throw new Error('invalid date');
    return moment(date).fromNow();
  }
}
