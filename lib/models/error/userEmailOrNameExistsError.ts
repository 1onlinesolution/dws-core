import { CustomError } from './customError';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';

export class UserEmailOrNameExistsError extends CustomError {
  statusCode = HttpStatusCode.Conflict;

  constructor() {
    super('User email or name already exists in database');
    this.name = 'UserEmailOrNameExistsError';
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
