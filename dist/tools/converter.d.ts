export declare class Converter {
    static toBoolean<T>(value: T, ifUndefinedSetToFalse?: boolean): boolean;
    static ms: (value: string | number, options?: {
        long: boolean;
    }) => string | number;
    static toSeconds: (value: string | number, options?: {
        long: boolean;
    }) => string | number;
    static checkBoxToBoolean: (value: string | undefined, valueExpected: string) => boolean;
}
