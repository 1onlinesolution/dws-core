import { HttpStatusCode } from '../../http';

export class DatabaseConnectionError extends Error {
  statusCode: number;
  constructor() {
    super('Error connecting to database');

    this.name = 'DatabaseConnectionError';
    this.statusCode = HttpStatusCode.ServerError;
  }
}