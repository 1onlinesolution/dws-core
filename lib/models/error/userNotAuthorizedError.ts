import { CustomError } from './customError';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';

export class UserNotAuthorizedError extends CustomError {
  statusCode = HttpStatusCode.Unauthorized;

  constructor() {
    super('User is not authorized');
    this.name = 'UserNotAuthorizedError';
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
