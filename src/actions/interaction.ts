import { CustomComponent } from '../components/ComponentRenderer/types'
import { StyleObject } from '../components/View'

export const openSidebar = () => ({ type: 'INTERACTION_OPEN_SIDEBAR' } as const)

export const closeSidebar = () =>
  ({ type: 'INTERACTION_CLOSE_SIDEBAR' } as const)

export const selectComponent = (key: number, component: CustomComponent) =>
  ({
    type: 'INTERACTION_SELECT_COMPONENT',
    payload: { key, component },
  } as const)

export const deselectComponent = () =>
  ({ type: 'INTERACTION_DESELECT_COMPONENT' } as const)

export const updateSelectedComponent = (
  updates: { style?: StyleObject } = {}
) =>
  ({
    type: 'INTERACTION_MODIFY_SELECTED_COMPONENT',
    payload: { updates },
  } as const)
