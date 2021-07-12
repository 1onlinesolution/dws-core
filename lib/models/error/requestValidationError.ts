import { ValidationError } from 'express-validator';
import { HttpStatusCode } from '../../http';

export class RequestValidationError extends Error {
  statusCode: number;
  constructor(public errors: ValidationError[]) {
    super('Validation error(s) occurred');

    this.name = 'RequestValidationError';
    this.statusCode = HttpStatusCode.BadRequest;
  }
}