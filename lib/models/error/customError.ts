import { ErrorItem } from '../../express';

export abstract class CustomError extends Error {
  public abstract statusCode: number;

  protected constructor(message: string) {
    super(message);

    this.name = 'CustomError';
  }

  abstract serializeErrors(): ErrorItem[];
}
