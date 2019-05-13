import { ReduxState } from '../reducers'

export const getSessionToken = (state: ReduxState) => state.session.token
