export interface IUserStatistics {
    loggedInLastDate: Date;
    logInsCount: number;
    runTimeSessionsCount: number;
}
export declare class UserStatistics implements IUserStatistics {
    loggedInLastDate: Date;
    logInsCount: number;
    runTimeSessionsCount: number;
    constructor({ loggedInLastDate, logInsCount, runTimeSessionsCount }?: {
        loggedInLastDate?: Date | undefined;
        logInsCount?: number | undefined;
        runTimeSessionsCount?: number | undefined;
    });
    static checkForError(userStatistics: IUserStatistics): Error | null;
}
