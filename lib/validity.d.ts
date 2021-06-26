export default class Validity {
    static isArray<T>(obj: T | undefined): boolean;
    static isInteger(obj: number | undefined): boolean;
    static isDefined<T>(obj: T): boolean;
    static isBoolean<T>(obj: T): boolean;
    static isObject<T>(obj: T): boolean;
    static isValidEmail(email: string | undefined): boolean;
    static isValidPassword(password: string | undefined): boolean;
    static isValidCurrency(text: string | undefined, prefix?: string | undefined): boolean;
    static isValidDate(date: Date | undefined): boolean;
    static isValidNumber(value: number | undefined, min?: number, max?: number, exclude?: number[]): boolean;
    static isValidInteger(value: number | undefined, min?: number, max?: number, exclude?: number[]): boolean;
    static isValidString(text: string | undefined, min?: number, max?: number): boolean;
    static isUndefinedOrEmptyString(text: string | undefined): boolean;
}
//# sourceMappingURL=validity.d.ts.map