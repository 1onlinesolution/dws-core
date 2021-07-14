import { HttpStatusCode, HttpStatusName } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';
import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = HttpStatusCode.NotFound;

  constructor() {
    super('Route not found');
    this.name = 'NotFoundError';
  }

  response(): ExpressErrorResponse {
    return {
      errors: [{ message: this.message }],
      statusCode: this.statusCode,
    };
  }

  serializeErrors(): ErrorItem[] {
    return [{ message: HttpStatusName.NotFound }];
  }
}
