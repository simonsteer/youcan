import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditor'

export interface MarginEditorProps {
  onChange: (value: { margin: string }) => void
}

const MarginEditor = ({ onChange }: MarginEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="margin"
    onChange={margin => onChange({ margin })}
  />
)

export default MarginEditor
