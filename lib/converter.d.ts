export default class Converter {
    static toBoolean: (value: boolean | string | undefined, ifUndefinedSetToFalse?: boolean) => boolean;
    static ms: (value: string | number, options: {
        long: boolean;
    }) => string | number;
    static toSeconds: (value: string | number, options: {
        long: boolean;
    }) => string | number;
    static checkBoxToBoolean: (value: string | undefined, valueExpected: string) => boolean;
}
//# sourceMappingURL=converter.d.ts.map