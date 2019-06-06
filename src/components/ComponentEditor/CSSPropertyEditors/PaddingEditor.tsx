import React, { useState } from 'react'
import NumericCSSPropertyEditor from "./NumericCSSPropertyEditor"
import Flex from '../../Flex';
import MenuItem from '../MenuItem';

const PADDING_TYPES = [
  'left',
  'bottom',
  'right',
  'top',
] as const

interface PaddingTypeEditorProps {
  onChange: (value: { [property: string]: string }) => void
  type: 'top' | 'right' | 'bottom' | 'left'
}

interface PaddingEditorProps {
  onChange: (value: { [property: string]: string }) => void
}

const PaddingTypeEditor = ({ onChange, type }: PaddingTypeEditorProps) => <NumericCSSPropertyEditor property={`padding-${type}`} displayName={type} transformValue={(number, unit) => `${number}${unit}`} dropdownProps={{ options: createDropdownOptions(type), defaultValue: 'px' }} onChange={onChange} />

export const PaddingEditor = ({ onChange }: PaddingEditorProps) => {
  const [padding, setPadding] = useState({ ['padding-top']: '0px', ['padding-right']: '0px', ['padding-bottom']: '0px', ['padding-left']: '0px' })

  const handleChange = (update: { [property: string]: string }) => {
    const nextValues = { ...padding, ...update }
    setPadding(nextValues)
    onChange(nextValues)
  }

  return <MenuItem title="padding">
    <Flex column reverse overflow="visible">
  {PADDING_TYPES.map(type =>
    <PaddingTypeEditor type={type} onChange={handleChange} />
    )}
    </Flex>
    </MenuItem>
}

const createDropdownOptions = (type: PaddingTypeEditorProps['type']) => [{ value: 'vw', label: '% window width' }, { value: 'vh', label: '% window height' }, { value: 'px', label: 'pixels' }, { value: '%', label: `% container ${type === 'bottom' || type ==='top' ? 'height' : 'width'}` }]