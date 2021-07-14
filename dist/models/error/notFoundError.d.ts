import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';
import { CustomError } from './customError';
export declare class NotFoundError extends CustomError {
    statusCode: HttpStatusCode;
    constructor();
    response(): ExpressErrorResponse;
    serializeErrors(): ErrorItem[];
}
