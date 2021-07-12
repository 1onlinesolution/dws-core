import { Request, Response, NextFunction } from 'express';

const ErrorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error('Not Found');
  next(error);
};

export { ErrorNotFoundHandler };
