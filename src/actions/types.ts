import * as requestActions from './request'
import * as sessionActions from './session'
import * as entitiesActions from './entities'
import * as interactionActions from './interaction'
import { ValueInObject } from '../../global.types'

export type SessionAction = ReturnType<ValueInObject<typeof sessionActions>>

export type EntitiesAction = ReturnType<ValueInObject<typeof entitiesActions>>

export type InteractionAction = ReturnType<
  ValueInObject<typeof interactionActions>
>

export type RequestAction = ReturnType<ValueInObject<typeof requestActions>>
