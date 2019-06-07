import React from 'react'
import DirectionalNumericCSSPropertyEditor, { DirectionalNumericCSSPropertyEditorProps } from './DirectionalNumericCSSPropertyEditor';

export interface PaddingEditorProps {
  onChange: DirectionalNumericCSSPropertyEditorProps['onChange']
}

const PaddingEditor = ({ onChange }: PaddingEditorProps) => <DirectionalNumericCSSPropertyEditor title="padding" onChange={onChange} />


export default PaddingEditor