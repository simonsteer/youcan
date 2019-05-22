import * as requestExports from './request'
import * as sessionExports from './session'
import * as entitiesExports from './entities'
import { ValueInObject } from '../../global.types'

const { actionTypes: requestActionTypes, ...requestActions } = requestExports
export type RequestAction = ReturnType<ValueInObject<typeof requestActions>>

const { actionTypes: sessionActionTypes, ...sessionActions } = sessionExports
export type SessionAction = ReturnType<ValueInObject<typeof sessionActions>>

const { actionTypes: entitiesActionTypes, ...entitiesActions } = entitiesExports
export type EntitiesAction = ReturnType<ValueInObject<typeof entitiesActions>>
