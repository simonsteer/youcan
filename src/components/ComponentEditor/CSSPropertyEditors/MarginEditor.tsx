import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'

export interface MarginProperties {
  margin?: string
}

export interface MarginEditorProps {
  onChange: (properties: MarginProperties) => void
}

const MarginEditor = ({ onChange }: MarginEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="Margin"
    onChange={margin => onChange({ margin })}
  />
)

export default MarginEditor
