import { CustomComponent } from '../components/ComponentRenderer/types'

export const interactionOpenSidebar = () =>
  ({ type: 'INTERACTION_OPEN_SIDEBAR' } as const)

export const interactionCloseSidebar = () =>
  ({ type: 'INTERACTION_CLOSE_SIDEBAR' } as const)

export const interactionSelectComponent = (
  key: number,
  component: CustomComponent
) =>
  ({
    type: 'INTERACTION_SELECT_COMPONENT',
    payload: { key, component },
  } as const)

export const interactionDeselectComponent = () =>
  ({ type: 'INTERACTION_DESELECT_COMPONENT' } as const)
