import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'

export const getInteractionState = (state: ReduxState) => state.interaction

export const getSelectedComponent = createSelector(
  getInteractionState,
  interaction => interaction.selectedComponent
)
