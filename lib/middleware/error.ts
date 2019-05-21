import { ErrorRequestHandler } from 'express'

export const error: ErrorRequestHandler = (_error, _, res, next) => {
  if (_error) {
    res.status(500).json({
      error: _error.toString(),
    })
  }
  next()
}
