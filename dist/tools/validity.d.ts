export declare class Validity {
    static isArray<T>(obj: T | undefined): boolean;
    static isInteger(obj: number): boolean;
    static isDefined<T>(obj: T): boolean;
    static isBoolean<T>(obj: T): boolean;
    static isObject<T>(obj: T): boolean;
    static isValidUrl(url: string): boolean;
    static isValidEmail(email: string): boolean;
    static isValidPassword(password: string): boolean;
    static isValidCurrency(text: string, prefix?: string | undefined): boolean;
    static isValidDate(date: Date | undefined): boolean;
    static isValidNumber(value: number, min?: number, max?: number, exclude?: number[]): boolean;
    static isValidInteger(value: number, min?: number, max?: number, exclude?: number[]): boolean;
    static isValidString(text: string, min?: number, max?: number): boolean;
    static isUndefinedOrEmptyString(text: string | undefined): boolean;
}
