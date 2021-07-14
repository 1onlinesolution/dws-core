import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../http';
import { CustomError } from '../models';
import { ExpressErrorResponse } from './expressErrorResponse';

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response<ExpressErrorResponse> => { // eslint-disable-line @typescript-eslint/no-unused-vars
  console.log('Something went wrong', err);

  const result: ExpressErrorResponse = {
    errors: [{ message: err.message }],
    statusCode: HttpStatusCode.BadRequest,
  };

  if (err instanceof CustomError) {
    result.errors = err.serializeErrors();
    result.statusCode = err.statusCode;
  }

  return res.status(result.statusCode).send(result);
};

export { ErrorHandler };
