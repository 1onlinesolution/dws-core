import { ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../http';
import { DatabaseConnectionError, RequestValidationError } from '../models';

export interface ExpressErrorResponse {
  message: string;
  errors: ValidationError[];
  statusCode: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log('Something went wrong', err);

  const result: ExpressErrorResponse = {
    message: err.message,
    errors: [],
    statusCode: HttpStatusCode.BadRequest,
  };

  if (err instanceof RequestValidationError) {
    result.errors = err.errors;
    result.statusCode = err.statusCode;
  } else if (err instanceof DatabaseConnectionError) {
    result.statusCode = err.statusCode;
  }

  res.status(HttpStatusCode.BadRequest).send(result);
};

export { ErrorHandler };
