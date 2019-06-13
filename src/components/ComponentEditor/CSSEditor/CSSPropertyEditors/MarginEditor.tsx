import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import { FlexProps } from '../../../Flex/Flex'

export interface MarginProperties {
  margin?: string
}

export interface MarginEditorProps extends Omit<FlexProps, 'children'> {
  onChange: (properties: MarginProperties) => void
}

const MarginEditor = ({ onChange, ...flexProps }: MarginEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="Margin"
    onChange={margin => onChange({ margin })}
    shortcutKey="M"
    {...flexProps}
  />
)

export default MarginEditor
