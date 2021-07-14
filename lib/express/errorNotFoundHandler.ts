import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../models';

const ErrorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new NotFoundError();
  next(error);
};

export { ErrorNotFoundHandler };
