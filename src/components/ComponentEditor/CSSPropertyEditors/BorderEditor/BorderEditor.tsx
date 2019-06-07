import React from 'react'
import NumericCSSPropertyEditor from '../NumericCSSPropertyEditor';
import MenuItem from '../../MenuItem';
import { createDirectionalDropdownProps } from '../DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor';

export interface BorderEditorProps {
  onChange: (value: string) => void 
}

const BorderEditor = ({ onChange }: BorderEditorProps) => {
  
  return <MenuItem title="border">
    <NumericCSSPropertyEditor displayName="top" dropdownProps={createDirectionalDropdownProps('top')} transformValue={(n, d) => `${n}${d}`} onChange={onChange} />
  </MenuItem>
}

export default BorderEditor