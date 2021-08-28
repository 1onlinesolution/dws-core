import { CustomError } from './customError';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';

export class UserNotVerifiedError extends CustomError {
  statusCode = HttpStatusCode.BadRequest;

  constructor() {
    super('User is not verified');
    this.name = 'UserNotVerifiedError';
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
