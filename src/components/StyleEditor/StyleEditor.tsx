import React, { Fragment, SyntheticEvent } from 'react'
import flatten from 'lodash/flatten'
import get from 'lodash/get'
import words from 'lodash/words'
import {
  CUSTOM_COMPONENT_PROPERTIES,
  FULL_PROPERTY_SET,
} from '../ComponentRenderer/constants'
import NumericInput from '../NumericInput'
import DropdownMenu from '../DropdownMenu'
import Text from '../Text'
import View from '../View'

interface StyleEditorProps {
  onChange: (
    change: { [key in keyof typeof FULL_PROPERTY_SET]: string }
  ) => void
}

const StyleEditor = ({ onChange }: StyleEditorProps) => {
  const editors = flatten(
    CUSTOM_COMPONENT_PROPERTIES.map(({ properties }) =>
      Object.keys(properties).map(key => ({
        key,
        value: properties[key],
      }))
    )
  )

  return (
    <View
      as="form"
      onChange={({ target }: SyntheticEvent) => {
        const name = get(target, 'name')
        const value = get(target, 'value')

        const { selectorProps = {} } = FULL_PROPERTY_SET[name]
        const { transformValue } = selectorProps
        const processedValue = transformValue ? transformValue(value) : value

        onChange({ [name]: processedValue })
      }}
    >
      {editors.map(
        ({ key, value: { selector, selectorProps, defaultValue } }) => {
          const Selector = selector === 'dropdown' ? DropdownMenu : NumericInput
          return (
            <Fragment key={key}>
              <Text>{words(key).join(' ')}</Text>
              <Selector name={key} start={defaultValue} {...selectorProps} />
            </Fragment>
          )
        }
      )}
    </View>
  )
}

export default StyleEditor
