import { CustomError } from './customError';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';
export declare class UserNotAuthorizedError extends CustomError {
    statusCode: HttpStatusCode;
    constructor();
    response(): ExpressErrorResponse;
    serializeErrors(): ErrorItem[];
}
