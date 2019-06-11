import React from 'react'
import DirectionalNumericCSSPropertyEditor from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'

export interface PaddingProperties {
  padding?: string
}

export interface PaddingEditorProps {
  onChange: (properties: PaddingProperties) => void
  zIndex?: number
}

const PaddingEditor = ({ onChange, zIndex }: PaddingEditorProps) => (
  <DirectionalNumericCSSPropertyEditor
    title="Padding"
    onChange={padding => onChange({ padding })}
    zIndex={zIndex}
  />
)

export default PaddingEditor
