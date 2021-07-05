"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatistics = void 0;
const tools_1 = require("../tools");
class UserStatistics {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor({ loggedInLastDate = tools_1.DateTimeUtils.currentUtcDate(), logInsCount = 0, runTimeSessionsCount = 0 } = {}) {
        this.loggedInLastDate = tools_1.DateTimeUtils.currentUtcDate();
        this.logInsCount = 0;
        this.runTimeSessionsCount = 0;
        this.loggedInLastDate = loggedInLastDate;
        this.logInsCount = logInsCount;
        this.runTimeSessionsCount = runTimeSessionsCount;
        return this;
    }
    static checkForError(userStatistics) {
        if (!userStatistics || !(userStatistics instanceof UserStatistics))
            return new Error('invalid user statistics details');
        if (!tools_1.Validity.isValidDate(userStatistics.loggedInLastDate))
            return new Error('invalid last log in date');
        if (!tools_1.Validity.isValidNumber(userStatistics.logInsCount, 0))
            return new Error('invalid log in count');
        if (!tools_1.Validity.isValidNumber(userStatistics.runTimeSessionsCount, 0))
            return new Error('invalid run-time sessions count');
        return null;
    }
}
exports.UserStatistics = UserStatistics;
//# sourceMappingURL=userStatistics.js.map