import React from 'react'
import DirectionalNumericCSSPropertyEditor, { DirectionalNumericCSSPropertyEditorProps } from './DirectionalNumericCSSPropertyEditor';

export interface MarginEditorProps {
  onChange: DirectionalNumericCSSPropertyEditorProps['onChange']
}

const MarginEditor = ({ onChange }: MarginEditorProps) => <DirectionalNumericCSSPropertyEditor title="margin" onChange={onChange} />


export default MarginEditor