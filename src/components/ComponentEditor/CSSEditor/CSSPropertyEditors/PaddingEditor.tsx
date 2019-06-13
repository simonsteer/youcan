import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import { FlexProps } from '../../../Flex/Flex'

export interface PaddingProperties {
  padding?: string
}

export interface PaddingEditorProps extends Omit<FlexProps, 'children'> {
  onChange: (properties: PaddingProperties) => void
}

const PaddingEditor = ({ onChange, ...flexProps }: PaddingEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="Padding"
    onChange={padding => onChange({ padding })}
    shortcutKey="P"
    {...flexProps}
  />
)

export default PaddingEditor
