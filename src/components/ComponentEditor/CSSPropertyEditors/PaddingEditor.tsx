import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'

export interface PaddingProperties {
  padding?: string
}

export interface PaddingEditorProps {
  onChange: (properties: PaddingProperties) => void
}

const PaddingEditor = ({ onChange }: PaddingEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="Padding"
    onChange={padding => onChange({ padding })}
  />
)

export default PaddingEditor
