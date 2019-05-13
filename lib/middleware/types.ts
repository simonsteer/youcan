import { Request, Response, NextFunction } from 'express'

export type Middleware<Q = null> = (
  req: Q extends null ? Request : Request & Q,
  res: Response,
  next: NextFunction
) => void
