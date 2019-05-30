import u from 'updeep'
import { InteractionAction } from '../actions/types'
import { CustomComponent } from '../components/ComponentRenderer/types'

export type InteractionMenuType = 'styling'

export interface Interaction {
  sidebar: {
    isOpen: boolean
    menuType: InteractionMenuType
  }
  selectedComponent: {
    key?: number
    component?: CustomComponent
  }
}

const initialState: Interaction = {
  sidebar: {
    isOpen: false,
    menuType: 'styling',
  },
  selectedComponent: {
    key: undefined,
    component: undefined,
  },
}

const interaction = (state = initialState, action: InteractionAction) => {
  switch (action.type) {
    case 'INTERACTION_OPEN_SIDEBAR':
      return u({ sidebar: { isOpen: true } }, state)
    case 'INTERACTION_CLOSE_SIDEBAR':
      return u({ sidebar: { isOpen: false } }, state)
    case 'INTERACTION_SELECT_COMPONENT':
      return u({ selectedComponent: action.payload }, state)
    case 'INTERACTION_DESELECT_COMPONENT':
      return u(
        {
          selectedComponent: {
            key: undefined,
            component: undefined,
          },
        },
        state
      )
    case 'INTERACTION_MODIFY_SELECTED_COMPONENT': {
      if (!state.selectedComponent.component) {
        return state
      }

      return u(
        {
          selectedComponent: {
            component: action.payload.updates,
          },
        },
        state
      )
    }
    default:
      return state
  }
}

export default interaction
