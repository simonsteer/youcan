import { Request as Req } from 'express'

export type Request<T = null> = T extends null ? Req : Req & T
