import kebabCase from 'lodash/kebabCase'
import { CustomComponent } from './types'
import Text from '../Text'
import View from '../View'

export const COMPONENT_TYPES: { [key: string]: (props: any) => JSX.Element } = {
  text: Text,
  box: View,
} as const

type Selector = 'dropdown' | 'numeric' | 'range'

export interface PropertyConfig {
  defaultValue: string | number
  selector: Selector
  selectorProps?: any
}

export interface Property {
  [property: string]: PropertyConfig
}

export interface PropertySet {
  title: string
  properties: Property
  advanced?: Property
}

const createNumeric = (transformValue: (n: string) => string) =>
  ({
    defaultValue: '0',
    selector: 'numeric',
    selectorProps: { transformValue },
  } as const)

const createDropdown = (
  options: string[],
  transformValue = (value: string) => value
) =>
  ({
    defaultValue: options[0],
    selector: 'dropdown',
    selectorProps: { options, transformValue },
  } as const)

const numericPixel = createNumeric(n => `${n}px`)
const color = createDropdown(['transparent', 'red', 'black', 'white'])
const dimension = createNumeric(n => (n === '0' ? 'auto' : `${n}px`))

export const DIMENSIONS: PropertySet = {
  title: 'Dimensions',
  properties: {
    width: dimension,
    maxWidth: dimension,
    height: dimension,
    maxHeight: dimension,
  },
} as const

const borderStyle = createDropdown(['solid', 'dotted', 'dashed'])
export const BORDER: PropertySet = {
  title: 'Border',
  properties: {
    borderColor: color,
    borderStyle,
    borderWidth: numericPixel,
    borderRadius: numericPixel,
  },
  advanced: {
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    borderTopWidth: numericPixel,
    borderRightWidth: numericPixel,
    borderBottomWidth: numericPixel,
    borderLeftWidth: numericPixel,
    borderTopStyle: borderStyle,
    borderRightStyle: borderStyle,
    borderBottomStyle: borderStyle,
    borderLeftStyle: borderStyle,
    borderTopLeftRadius: numericPixel,
    borderTopRightRadius: numericPixel,
    borderBottomRightRadius: numericPixel,
    borderBottomLeftRadius: numericPixel,
  },
} as const

export const BACKGROUND: PropertySet = {
  title: 'Background',
  properties: {
    backgroundColor: color,
    backgroundImage: createDropdown(['none']),
    backgroundRepeat: createDropdown(
      ['no repeat', 'repeat', 'repeat x', 'repeat y'],
      kebabCase
    ),
    backgroundSize: createDropdown(['cover', 'contain']),
  },
} as const

export const FONT: PropertySet = {
  title: 'Font',
  properties: {
    fontSize: {
      defaultValue: 12,
      selector: 'numeric',
      selectorProps: { transformValue: (n: number) => `${n}px` },
    },
    fontStyle: createDropdown(['normal', 'italic']),
    fontWeight: createDropdown(['normal', 'bold']),
    fontFamily: createDropdown(['serif', 'sans serif', 'monospace'], kebabCase),
    color,
    letterSpacing: createNumeric((n: string) =>
      n === '0' ? 'normal' : `${n}px`
    ),
  },
} as const

export const MARGIN: PropertySet = {
  title: 'Margins',
  properties: {
    marginTop: numericPixel,
    marginRight: numericPixel,
    marginBottom: numericPixel,
    marginLeft: numericPixel,
  },
} as const

export const PADDING: PropertySet = {
  title: 'Padding',
  properties: {
    paddingTop: numericPixel,
    paddingRight: numericPixel,
    paddingBottom: numericPixel,
    paddingLeft: numericPixel,
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
  (style, { properties }) => {
    const nextStyle = Object.keys(properties).reduce(
      (propertyMap, property) => {
        const { defaultValue, selectorProps = {} } = properties[property]
        const { transformValue } = selectorProps

        return {
          ...propertyMap,
          [property]: transformValue
            ? transformValue(defaultValue)
            : defaultValue,
        }
      },
      {}
    )

    return {
      ...style,
      ...nextStyle,
    }
  },
  { position: 'relative' }
)

export const FULL_PROPERTY_SET = {
  ...DIMENSIONS.properties,
  ...BACKGROUND.properties,
  ...BORDER.properties,
  ...FONT.properties,
  ...MARGIN.properties,
  ...PADDING.properties,
}

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
