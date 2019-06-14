import React, { useState } from 'react'
import NumericDropdownCSSPropertyEditor from '../NumericDropdownCSSPropertyEditor'
import Expandable from '../../../../Expandable'
import EditorTitle from '../EditorTitle'
import { createDirectionalDropdownProps } from '../DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import KeyboardShortcut from '../../../../KeyboardShortcut'
import Flex, { FlexProps } from '../../../../Flex/Flex'
import BinaryModeIndicator from '../../../../BinaryModeIndicator'
import BorderRadiusEditor from './BorderRadiusEditor'

export interface DimensionsProperties {
  width?: string
  height?: string
}

export interface DimensionEditorProps extends Omit<FlexProps, 'children'> {
  onChange: (properties: DimensionsProperties) => void
}

const DimensionEditor = ({ onChange, ...flexProps }: DimensionEditorProps) => (
  <Expandable
    {...flexProps}
    title={({ toggleIsOpen }) => (
      <EditorTitle
        shortcut={(
          <KeyboardShortcut
            shortcut={{
              key: 'D',
              callback: toggleIsOpen,
              options: { meta: true },
            }}
          />
)}
        onClick={toggleIsOpen}
      >
        Dimensions
      </EditorTitle>
    )}
  >
    <Flex column overflow="visible" padding="12px">
      <NumericDropdownCSSPropertyEditor
        zIndex={1}
        displayName="height"
        dropdownProps={createDirectionalDropdownProps('top')}
        onChange={height => onChange({ height })}
      />
      <NumericDropdownCSSPropertyEditor
        displayName="width"
        dropdownProps={createDirectionalDropdownProps('left')}
        onChange={width => onChange({ width })}
      />
    </Flex>
      <BorderRadiusEditor />
  </Expandable>
)

export default DimensionEditor
