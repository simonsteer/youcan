import u from 'updeep'
import React, { useState } from 'react'
import Expandable from '../../../Expandable'
import EditorTitle from './EditorTitle'
import KeyboardShortcut from '../../../KeyboardShortcut'
import Flex from '../../../Flex'
import NumericDropdownCSSPropertyEditor from './NumericDropdownCSSPropertyEditor'
import { FlexProps } from '../../../Flex/Flex'
import { createBoxShadowStyle } from '../../../Flex/utils'
import { ColorPicker } from '../../../Inputs'
import { createDirectionalDropdownProps } from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'

export interface BoxShadowProperties {
  boxShadow?: string
}

export interface BoxShadowEditorProps extends Omit<FlexProps, 'children'> {
  onChange: (properties: BoxShadowProperties) => void
}

const BoxShadowEditor = ({ onChange, ...flexProps }: BoxShadowEditorProps) => {
  const [boxShadow, setBoxShadow] = useState({
    offset: { x: '0px', y: '0px' },
    blur: '0px',
    spread: '0px',
    color: 'transparent',
  })

  const handleChange = (changes: { [key: string]: any }) => {
    const nextBoxShadow = u(changes, boxShadow)
    setBoxShadow(nextBoxShadow)

    const style = { boxShadow: createBoxShadowStyle(nextBoxShadow) }
    onChange(style)
  }

  return (
    <Expandable
      {...flexProps}
      title={({ toggleIsOpen }) => (
        <EditorTitle
          shortcut={(
            <KeyboardShortcut
              shortcut={{
                key: 'S',
                callback: toggleIsOpen,
                options: { meta: true },
              }}
            />
)}
          onClick={toggleIsOpen}
        >
          Shadow
        </EditorTitle>
      )}
    >
      <Flex column overflow="visible" padding="12px">
        <ColorPicker
          zIndex={4}
          initialValue="#fff"
          onChange={color => handleChange({ color })}
          margin="0 0 12px 0"
        />
        <NumericDropdownCSSPropertyEditor
          zIndex={3}
          displayName="horizontal offset"
          dropdownProps={createDirectionalDropdownProps('all')}
          onChange={x => handleChange({ offset: { x } })}
        />
        <NumericDropdownCSSPropertyEditor
          zIndex={2}
          displayName="vertical offset"
          dropdownProps={createDirectionalDropdownProps('all')}
          onChange={y => handleChange({ offset: { y } })}
        />
        <NumericDropdownCSSPropertyEditor
          zIndex={1}
          displayName="blur"
          dropdownProps={createDirectionalDropdownProps('all')}
          onChange={blur => handleChange({ blur })}
        />
        <NumericDropdownCSSPropertyEditor
          displayName="spread"
          dropdownProps={createDirectionalDropdownProps('all')}
          onChange={spread => handleChange({ spread })}
        />
      </Flex>
    </Expandable>
  )
}

export default BoxShadowEditor
