import { CustomError } from './customError';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';

export class UserInvalidCredentialsError extends CustomError {
  statusCode = HttpStatusCode.BadRequest;

  constructor() {
    super('Invalid user credentials detected');
    this.name = 'UserInvalidCredentialsError';
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
