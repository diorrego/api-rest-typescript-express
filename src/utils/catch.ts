import { Response } from 'express';

interface errors extends Error {
  code: number;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendError = (res: Response, e: errors | any): void => {
  const statusCode: number = e.code || 500;
  res.status(statusCode).send(e.message);
};
