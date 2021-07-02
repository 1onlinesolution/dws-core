import DateTimeUtils from '../tools/dateTimeUtils';
import Validity from '../tools/validity';

export interface IUserStatistics {
  loggedInLastDate: Date;
  logInsCount: number;
  runTimeSessionsCount: number;
}

export class UserStatistics implements IUserStatistics {
  loggedInLastDate = DateTimeUtils.currentUtcDate();
  logInsCount = 0;
  runTimeSessionsCount = 0;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor({ loggedInLastDate = DateTimeUtils.currentUtcDate(), logInsCount = 0, runTimeSessionsCount = 0 } = {}) {
    this.loggedInLastDate = loggedInLastDate;
    this.logInsCount = logInsCount;
    this.runTimeSessionsCount = runTimeSessionsCount;

    return this;
  }

  static checkForError(userStatistics: IUserStatistics): Error | null {
    if (!userStatistics || !(userStatistics instanceof UserStatistics)) return new Error('invalid user statistics details');
    if (!Validity.isValidDate(userStatistics.loggedInLastDate)) return new Error('invalid last log in date');
    if (!Validity.isValidNumber(userStatistics.logInsCount, 0)) return new Error('invalid log in count');
    if (!Validity.isValidNumber(userStatistics.runTimeSessionsCount, 0)) return new Error('invalid run-time sessions count');
    return null;
  }
}
