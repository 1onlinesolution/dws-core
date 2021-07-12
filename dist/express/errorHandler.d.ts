import { ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
export interface ExpressErrorResponse {
    message: string;
    errors: ValidationError[];
    statusCode: number;
}
declare const ErrorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export { ErrorHandler };
