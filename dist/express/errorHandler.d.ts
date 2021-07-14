import { Request, Response, NextFunction } from 'express';
import { ExpressErrorResponse } from './expressErrorResponse';
declare const ErrorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<ExpressErrorResponse>;
export { ErrorHandler };
