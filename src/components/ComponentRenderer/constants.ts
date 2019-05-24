import { CustomComponent } from './types'
import Text from '../Text'
import View, { StyleObject } from '../View'

export const COMPONENT_TYPES: { [key: string]: (props: any) => JSX.Element } = {
  text: Text,
  box: View,
} as const

export const DIMENSIONS = {
  title: 'Dimensions',
  properties: {
    width: 'auto',
    maxWidth: 'auto',
    height: 'auto',
    maxHeight: 'auto',
  },
} as const

export const BORDER = {
  title: 'Border',
  properties: {
    borderColor: 'transparent',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderRadius: '0px',
  },
  advanced: {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '0px',
    borderLeftWidth: '0px',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
  },
} as const

export const BACKGROUND = {
  title: 'Background',
  properties: {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'unset',
  },
} as const

export const FONT = {
  title: 'Font',
  properties: {
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    color: '#000000',
    letterSpacing: 'normal',
  },
} as const

export const MARGIN = {
  title: 'Margins',
  properties: {
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
  },
} as const

export const PADDING = {
  title: 'Padding',
  properties: {
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
  },
} as const

export const CUSTOM_COMPONENT_PROPERTIES = [
  DIMENSIONS,
  BACKGROUND,
  BORDER,
  FONT,
  MARGIN,
  PADDING,
] as const

export const DEFAULT_CUSTOM_COMPONENT_STYLE = CUSTOM_COMPONENT_PROPERTIES.reduce(
  (defaultStyles, propertyConfig) => {
    const { properties } = propertyConfig
    return {
      ...defaultStyles,
      ...properties,
    }
  },
  { position: 'relative' }
)

export const MOCK_CUSTOM_COMPONENT: CustomComponent = {
  type: 'text',
  children: 'Hello world!',
  style: {
    color: 'red',
    fontSize: 17,
    padding: '10px',
    border: '1px solid blue',
  },
}

export const NESTED: CustomComponent = {
  type: 'box',
  children: {
    type: 'text',
    children: 'Hello world!',
    style: {
      ...DEFAULT_CUSTOM_COMPONENT_STYLE,
      color: 'red',
      fontSize: '12pt',
      padding: '10px',
      border: '1px solid blue',
    },
  },
  style: {
    ...DEFAULT_CUSTOM_COMPONENT_STYLE,
    width: '700px',
    height: '450px',
    padding: '20px',
    borderWidth: '3px',
    borderColor: 'red',
    borderStyle: 'dashed',
  },
}
