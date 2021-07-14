import { ErrorItem } from '../../express';
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    protected constructor(message: string);
    abstract serializeErrors(): ErrorItem[];
}
