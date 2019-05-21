import { Request } from 'express'

export interface ExtendedRequest<P = any, B = any> extends Request {
  params: P
  body: B
}
