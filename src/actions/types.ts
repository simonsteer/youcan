import * as requestActions from './request'
import * as sessionActions from './session'
import * as entitiesActions from './entities'
import { ValueInObject } from '../../global.types'

const allActions = {
  ...requestActions,
  ...sessionActions,
  ...entitiesActions,
} as const

export type AllActionCreators = typeof allActions

export type ActionCreator = ValueInObject<AllActionCreators>

export type Action = ReturnType<ActionCreator>
