import React from 'react'
import NumericCSSPropertyEditor from './NumericDropdownCSSPropertyEditor'
import AccordionMenu from '../../../AccordionMenu'
import EditorTitle from '../EditorTitle'
import { createDirectionalDropdownProps } from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import Flex from '../../../Flex'

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
    <AccordionMenu
      zIndex={zIndex}
      title={({ toggleIsOpen, setIsOpen, isOpen }) => (
        <EditorTitle
          shortcut={{
            key: 'D',
            callback: toggleIsOpen,
            options: { meta: true },
          }}
          onClick={toggleIsOpen}
          tabIndex={0}
          onFocus={() => {
            if (isOpen) return
            setIsOpen(true)
          }}
        >
          Dimensions
        </EditorTitle>
      )}
    >
      <Flex column reverse overflow="visible" padding="12px">
        <NumericCSSPropertyEditor
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
    </AccordionMenu>
  )
}

export default DimensionEditor
