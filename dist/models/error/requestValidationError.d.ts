import { ValidationError } from 'express-validator';
export declare class RequestValidationError extends Error {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
}
