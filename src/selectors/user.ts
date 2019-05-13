import { ReduxState } from '../reducers'
import { UserSchema } from '../../lib/models'
import { Id } from '../../global.types'

export interface User extends UserSchema {
  id: Id
}

export const getCurrentUser = (state: ReduxState) => state.entities.user
