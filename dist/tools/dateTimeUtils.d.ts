export declare class DateTimeUtils {
    static parse(dateAsString: string): Date;
    static dateToUTC(date: Date): Date;
    static currentUtcDate(): Date;
    static displayTimeFromNow(date: Date): string;
}
