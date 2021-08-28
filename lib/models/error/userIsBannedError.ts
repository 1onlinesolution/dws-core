import { CustomError } from './customError';
import { HttpStatusCode } from '../../http';
import { ErrorItem, ExpressErrorResponse } from '../../express';

export class UserIsBannedError extends CustomError {
  statusCode = HttpStatusCode.BadRequest;

  constructor() {
    super('User access is forbidden');
    this.name = 'UserIsBannedError';
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
