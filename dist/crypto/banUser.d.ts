export declare class BanUser {
    private readonly blockList;
    constructor();
    isAllowed(ip: string): boolean;
    successfulAttempt(ip: string): void;
    failedAttempt(ip: string): void;
}
