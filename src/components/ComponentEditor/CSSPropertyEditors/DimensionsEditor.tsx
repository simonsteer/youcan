import React from 'react'
import NumericCSSPropertyEditor from './NumericCSSPropertyEditor'
import AccordionMenu from '../../AccordionMenu'
import EditorTitle from '../EditorTitle'
import { createDirectionalDropdownProps } from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import Flex from '../../Flex'

export interface DimensionsProperties {
  width?: string
  height?: string
}

export interface DimensionEditorProps {
  onChange: (properties: DimensionsProperties) => void
}

const DimensionEditor = ({ onChange }: DimensionEditorProps) => {
  return (
    <AccordionMenu title={<EditorTitle size="lg" title="Dimensions" />}>
      <Flex column reverse overflow="visible" padding="0px 12px">
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
