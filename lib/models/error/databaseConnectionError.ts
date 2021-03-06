import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';
import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode = HttpStatusCode.ServerError;

  constructor() {
    super('Error connecting to database');
    this.name = 'DatabaseConnectionError';
  }

  response(): ExpressErrorResponse {
    return {
      errors: [{ message: this.message }],
      statusCode: this.statusCode,
    };
  }

  serializeErrors(): ErrorItem[] {
    return [{ message: this.message }];
  }
}
