import { ValidationError } from 'express-validator';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';
import { CustomError } from './customError';
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: HttpStatusCode;
    constructor(errors: ValidationError[]);
    response(): ExpressErrorResponse;
    serializeErrors(): ErrorItem[];
}
