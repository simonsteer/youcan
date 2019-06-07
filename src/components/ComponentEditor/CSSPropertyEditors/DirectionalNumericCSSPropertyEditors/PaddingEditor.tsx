import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditor'

export interface PaddingEditorProps {
  onChange: (value: { padding: string }) => void
}

const PaddingEditor = ({ onChange }: PaddingEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="padding"
    onChange={padding => onChange({ padding })}
  />
)

export default PaddingEditor
