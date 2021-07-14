import { ValidationError } from 'express-validator';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
  statusCode = HttpStatusCode.BadRequest;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    this.name = 'RequestValidationError';
  }

  response(): ExpressErrorResponse {
    return {
      errors: this.serializeErrors(),
      statusCode: this.statusCode,
    };
  }

  serializeErrors(): ErrorItem[] {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}