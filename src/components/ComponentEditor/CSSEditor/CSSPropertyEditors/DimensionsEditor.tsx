import React from 'react'
import NumericCSSPropertyEditor from './NumericDropdownCSSPropertyEditor'
import Expandable from '../../../Expandable'
import EditorTitle from '../EditorTitle'
import { createDirectionalDropdownProps } from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import Flex from '../../../Flex'
import KeyboardShortcut from '../../../KeyboardShortcut'

export interface DimensionsProperties {
  width?: string
  height?: string
}

export interface DimensionEditorProps {
  onChange: (properties: DimensionsProperties) => void
  zIndex?: number
}

const DimensionEditor = ({ onChange, zIndex = 0 }: DimensionEditorProps) => {
  return (
    <Expandable
      zIndex={zIndex}
      title={({ toggleIsOpen }) => (
        <EditorTitle
          shortcut={
            <KeyboardShortcut
              shortcut={{
                key: 'D',
                callback: toggleIsOpen,
                options: { meta: true },
              }}
            />
          }
          onClick={toggleIsOpen}
        >
          Dimensions
        </EditorTitle>
      )}
    >
      <Flex column overflow="visible" padding="12px">
        <NumericCSSPropertyEditor
          zIndex={1}
          displayName="height"
          dropdownProps={createDirectionalDropdownProps('top')}
          onChange={height => onChange({ height })}
        />
        <NumericCSSPropertyEditor
          displayName="width"
          dropdownProps={createDirectionalDropdownProps('left')}
          onChange={width => onChange({ width })}
        />
      </Flex>
    </Expandable>
  )
}

export default DimensionEditor
