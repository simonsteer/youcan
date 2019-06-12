import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'

export interface MarginProperties {
  margin?: string
}

export interface MarginEditorProps {
  onChange: (properties: MarginProperties) => void
  zIndex?: number
}

const MarginEditor = ({ onChange, zIndex = 0 }: MarginEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="Margin"
    onChange={margin => onChange({ margin })}
    zIndex={zIndex}
    shortcutKey="M"
  />
)

export default MarginEditor
